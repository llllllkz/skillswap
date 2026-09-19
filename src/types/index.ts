export type PostType = 'teach' | 'learn'
export type Mode = 'online' | 'offline' | 'both'
export type Level = '入门' | '进阶' | '精通'

export interface SkillPost {
  id: string
  userId: string
  type: PostType
  title: string
  category: string
  level: Level
  description: string
  mode: Mode
  city: string
  durationMin: number
  /** 技能币/次，0 表示仅接受互换 */
  priceCoins: number
  acceptSwap: boolean
  /** 期望换回的技能关键词 */
  wantsInReturn: string[]
  createdAt: number
}

export interface User {
  id: string
  name: string
  emoji: string
  color: string
  title: string
  city: string
  credit: number
  rating: number
  ratingCount: number
  taughtCount: number
  learnedCount: number
  tags: string[]
}

export type SwapStatus = 'pending' | 'accepted' | 'done' | 'reviewed' | 'declined'

export interface SwapRequest {
  id: string
  fromUserId: string
  toUserId: string
  /** 对方将教我的帖子 */
  teachPostId: string
  /** 我将教对方的帖子（双向互换），为空则纯技能币 */
  givePostId?: string
  payCoins: number
  message: string
  status: SwapStatus
  /** learn=我求学（我付币）；teach=我授课（对方付币，完成时结算给我）。种子数据缺省视为 learn */
  direction?: 'learn' | 'teach'
  createdAt: number
}

export interface Review {
  id: string
  swapId: string
  fromUserId: string
  toUserId: string
  score: number
  comment: string
  skillTitle: string
  createdAt: number
}

export const CATEGORIES = [
  '音乐', '编程', '摄影', '外语', '设计', '烹饪', '运动', '手工', '职场', '生活',
] as const

export const MODE_LABEL: Record<Mode, string> = {
  online: '线上',
  offline: '线下',
  both: '线上/线下',
}
