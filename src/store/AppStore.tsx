import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { SkillPost, SwapRequest, Review, User } from '@/types'
import { CURRENT_USER_ID, seedPosts, seedSwaps, seedReviews, seedUsers } from '@/data/seed'

interface AppState {
  posts: SkillPost[]
  swaps: SwapRequest[]
  reviews: Review[]
  coins: number
  addPost: (p: Omit<SkillPost, 'id' | 'userId' | 'createdAt'>) => void
  removePost: (id: string) => void
  createSwap: (s: Omit<SwapRequest, 'id' | 'fromUserId' | 'createdAt' | 'status'>) => void
  updateSwapStatus: (id: string, status: SwapRequest['status']) => void
  addReview: (r: Omit<Review, 'id' | 'fromUserId' | 'createdAt'>) => void
}

const Ctx = createContext<AppState | null>(null)

const LS_KEY = 'skillswap-state-v1'

interface Persisted {
  myPosts: SkillPost[]
  mySwaps: SwapRequest[]
  myReviews: Review[]
  swapOverrides: Record<string, SwapRequest['status']>
  coins: number
}

function loadPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { myPosts: [], mySwaps: [], myReviews: [], swapOverrides: {}, coins: 120 }
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [persisted, setPersisted] = useState<Persisted>(loadPersisted)

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(persisted))
  }, [persisted])

  const value = useMemo<AppState>(() => {
    // 合并种子数据与用户产生的数据
    const seedPostsFiltered = seedPosts.filter(p => !persisted.myPosts.some(mp => mp.id === p.id))
    const posts = [...persisted.myPosts, ...seedPostsFiltered]

    const seedsWithOverrides = seedSwaps.map(s =>
      persisted.swapOverrides[s.id] ? { ...s, status: persisted.swapOverrides[s.id] } : s
    )
    const seedSwapsFiltered = seedsWithOverrides.filter(s => !persisted.mySwaps.some(ms => ms.id === s.id))
    const swaps = [...persisted.mySwaps, ...seedSwapsFiltered].sort((a, b) => b.createdAt - a.createdAt)

    const seedReviewsFiltered = seedReviews.filter(r => !persisted.myReviews.some(mr => mr.id === r.id))
    const reviews = [...persisted.myReviews, ...seedReviewsFiltered].sort((a, b) => b.createdAt - a.createdAt)

    return {
      posts,
      swaps,
      reviews,
      coins: persisted.coins,
      addPost: (p) => {
        const post: SkillPost = { ...p, id: `p-${Date.now()}`, userId: CURRENT_USER_ID, createdAt: Date.now() }
        setPersisted(prev => ({ ...prev, myPosts: [post, ...prev.myPosts] }))
      },
      removePost: (id) => {
        setPersisted(prev => ({ ...prev, myPosts: prev.myPosts.filter(p => p.id !== id) }))
      },
      createSwap: (s) => {
        const swap: SwapRequest = { ...s, id: `s-${Date.now()}`, fromUserId: CURRENT_USER_ID, status: 'pending', createdAt: Date.now() }
        setPersisted(prev => ({
          ...prev,
          mySwaps: [swap, ...prev.mySwaps],
          // 我求学才预付技能币；我授课则完成时由对方支付
          coins: s.direction === 'teach' ? prev.coins : prev.coins - s.payCoins,
        }))
      },
      updateSwapStatus: (id, status) => {
        setPersisted(prev => {
          const isSeed = seedSwaps.some(s => s.id === id)
          let coins = prev.coins
          const swap = [...prev.mySwaps, ...seedsWithOverrides].find(s => s.id === id)
          // 完成时结算：别人向我求学（toUserId=me）或我授课（direction=teach），技能币入账
          if (status === 'done' && swap && swap.payCoins > 0 && swap.status !== 'done') {
            if (swap.toUserId === CURRENT_USER_ID || swap.direction === 'teach') coins += swap.payCoins
          }
          if (status === 'declined' && swap && swap.fromUserId === CURRENT_USER_ID && swap.direction !== 'teach' && swap.payCoins > 0 && swap.status === 'pending') {
            coins += swap.payCoins // 拒绝则退款
          }
          if (isSeed) {
            return { ...prev, coins, swapOverrides: { ...prev.swapOverrides, [id]: status } }
          }
          return { ...prev, coins, mySwaps: prev.mySwaps.map(s => (s.id === id ? { ...s, status } : s)) }
        })
      },
      addReview: (r) => {
        const review: Review = { ...r, id: `r-${Date.now()}`, fromUserId: CURRENT_USER_ID, createdAt: Date.now() }
        setPersisted(prev => ({ ...prev, myReviews: [review, ...prev.myReviews] }))
      },
    }
  }, [persisted])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAppStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}

export function getUser(id: string): User {
  return seedUsers.find(u => u.id === id) ?? seedUsers[0]
}

/** 关键词是否命中（标题+类目+期望换回） */
function hit(post: SkillPost, keyword: string): boolean {
  const k = keyword.toLowerCase()
  return (
    post.title.toLowerCase().includes(k) ||
    post.category.toLowerCase().includes(k) ||
    post.description.toLowerCase().includes(k) ||
    post.wantsInReturn.some(w => w.toLowerCase().includes(k) || k.includes(w.toLowerCase()))
  )
}

export interface MatchResult {
  teacher: User
  teachPost: SkillPost
  score: number
  reasons: string[]
  /** 双向匹配：对方也想学我能教的 */
  mutual: boolean
  mutualPost?: SkillPost // 对方想学、且我能教的帖子
}

/** 为当前用户的一条「想学」寻找老师 */
export function findMatches(myWant: SkillPost, allPosts: SkillPost[]): MatchResult[] {
  const myTeachPosts = allPosts.filter(p => p.userId === CURRENT_USER_ID && p.type === 'teach')
  const results: MatchResult[] = []

  for (const post of allPosts) {
    if (post.userId === CURRENT_USER_ID || post.type !== 'teach') continue
    let score = 0
    const reasons: string[] = []

    if (post.category === myWant.category) { score += 40; reasons.push(`同属「${post.category}」类目`) }
    if (hit(post, myWant.title) || hit(myWant, post.title)) { score += 20; reasons.push('关键词高度相关') }
    if (post.mode === 'both' || myWant.mode === 'both' || post.mode === myWant.mode) { score += 15; reasons.push('上课方式兼容') }
    if (post.city === myWant.city && post.mode !== 'online') { score += 10; reasons.push(`同在${post.city}`) }
    if (post.level === myWant.level) { score += 5; reasons.push('难度匹配') }
    if (score < 40) continue

    // 双向匹配：对方有「想学」且与我的「能教」对上
    let mutual = false
    let mutualPost: SkillPost | undefined
    for (const myTeach of myTeachPosts) {
      const theirWant = allPosts.find(
        p => p.userId === post.userId && p.type === 'learn' &&
          (p.category === myTeach.category || hit(p, myTeach.title) || myTeach.wantsInReturn.some(w => hit(p, w)))
      )
      if (theirWant) {
        mutual = true
        mutualPost = theirWant
        score += 25
        reasons.unshift(`双向互补：TA 想学「${theirWant.title}」，正是你能教的`)
        break
      }
    }
    // 对方明确表示想换回的技能与我的匹配
    if (!mutual && post.wantsInReturn.some(w => myTeachPosts.some(t => hit(t, w)))) {
      score += 15
      reasons.push('TA 期望换回的技能你有')
    }

    results.push({ teacher: getUser(post.userId), teachPost: post, score: Math.min(score, 99), reasons, mutual, mutualPost })
  }
  return results.sort((a, b) => b.score - a.score)
}
