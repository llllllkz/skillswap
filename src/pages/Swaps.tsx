import { useState } from 'react'
import { CalendarCheck, Check, X, Star, Coins, Repeat2, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { AvatarBadge } from '@/components/AvatarBadge'
import { useAppStore, getUser } from '@/store/AppStore'
import { CURRENT_USER_ID } from '@/data/seed'
import type { SwapRequest, SwapStatus } from '@/types'
import { cn } from '@/lib/utils'

const STATUS_LABEL: Record<SwapStatus, { text: string; cls: string }> = {
  pending: { text: '待确认', cls: 'bg-amber-100 text-amber-700' },
  accepted: { text: '已约定', cls: 'bg-sky-100 text-sky-700' },
  done: { text: '已完成', cls: 'bg-emerald-100 text-emerald-700' },
  reviewed: { text: '已互评', cls: 'bg-slate-100 text-slate-500' },
  declined: { text: '已婉拒', cls: 'bg-slate-100 text-slate-400' },
}

function ReviewDialog({ swap, onClose }: { swap: SwapRequest; onClose: () => void }) {
  const { posts, addReview, updateSwapStatus } = useAppStore()
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState('')
  const teachPost = posts.find(p => p.id === swap.teachPostId)
  // 评价的对象：我求学评老师；我授课评学生
  const targetId = swap.direction === 'teach' ? swap.toUserId : swap.toUserId
  const target = getUser(targetId === CURRENT_USER_ID ? swap.fromUserId : targetId)

  const submit = () => {
    addReview({ swapId: swap.id, toUserId: target.id, score, comment: comment || '合作愉快！', skillTitle: teachPost?.title ?? '' })
    updateSwapStatus(swap.id, 'reviewed')
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>评价 {target.name}</DialogTitle></DialogHeader>
        <div className="flex justify-center gap-1 py-2">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setScore(n)}>
              <Star className={cn('h-8 w-8 transition-colors', n <= score ? 'fill-amber-400 text-amber-400' : 'text-slate-200')} />
            </button>
          ))}
        </div>
        <Textarea rows={3} placeholder="说说这次交换的体验…" value={comment} onChange={e => setComment(e.target.value)} />
        <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={submit}>提交评价</Button>
      </DialogContent>
    </Dialog>
  )
}

function SwapCard({ swap }: { swap: SwapRequest }) {
  const { posts, updateSwapStatus } = useAppStore()
  const [reviewing, setReviewing] = useState(false)
  const from = getUser(swap.fromUserId)
  const to = getUser(swap.toUserId)
  const teachPost = posts.find(p => p.id === swap.teachPostId)
  const givePost = swap.givePostId ? posts.find(p => p.id === swap.givePostId) : undefined
  const iAmReceiver = swap.toUserId === CURRENT_USER_ID
  const other = iAmReceiver ? from : to
  const st = STATUS_LABEL[swap.status]

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <AvatarBadge user={other} />
            <div>
              <div className="font-semibold text-slate-900">{other.name}
                <span className="ml-2 text-xs font-normal text-slate-400">
                  {iAmReceiver ? '向你求学' : swap.direction === 'teach' ? '接受你的授课邀请' : '将为你授课'}
                </span>
              </div>
              <div className="text-xs text-slate-400">{new Date(swap.createdAt).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
          <Badge className={cn(st.cls, 'hover:bg-opacity-100')}>{st.text}</Badge>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-slate-900">{teachPost?.title ?? '（技能已删除）'}</span>
            {givePost ? (
              <span className="flex items-center gap-1 text-orange-600"><Repeat2 className="h-3.5 w-3.5" />换「{givePost.title}」</span>
            ) : swap.payCoins > 0 ? (
              <span className="flex items-center gap-1 text-amber-600"><Coins className="h-3.5 w-3.5" />{swap.payCoins} 技能币</span>
            ) : (
              <span className="text-slate-400">纯互换</span>
            )}
          </div>
          {swap.message && (
            <p className="mt-2 flex gap-1.5 text-sm text-slate-500">
              <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0" />{swap.message}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {iAmReceiver && swap.status === 'pending' && (
            <>
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600" onClick={() => updateSwapStatus(swap.id, 'accepted')}>
                <Check className="mr-1 h-4 w-4" />接受并约时间
              </Button>
              <Button size="sm" variant="outline" onClick={() => updateSwapStatus(swap.id, 'declined')}>
                <X className="mr-1 h-4 w-4" />婉拒
              </Button>
            </>
          )}
          {!iAmReceiver && swap.status === 'pending' && (
            <span className="text-sm text-slate-400">等待对方确认…</span>
          )}
          {swap.status === 'accepted' && (
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => updateSwapStatus(swap.id, 'done')}>
              <CalendarCheck className="mr-1 h-4 w-4" />课程完成，确认结算
            </Button>
          )}
          {swap.status === 'done' && (
            <Button size="sm" variant="outline" onClick={() => setReviewing(true)}>
              <Star className="mr-1 h-4 w-4" />评价 TA
            </Button>
          )}
          {swap.status === 'done' && swap.payCoins > 0 && (iAmReceiver || swap.direction === 'teach') && (
            <span className="self-center text-xs text-emerald-600">已入账 +{swap.payCoins} 技能币</span>
          )}
        </div>
      </CardContent>
      {reviewing && <ReviewDialog swap={swap} onClose={() => setReviewing(false)} />}
    </Card>
  )
}

export default function Swaps() {
  const { swaps } = useAppStore()
  const mine = swaps.filter(s => s.fromUserId === CURRENT_USER_ID || s.toUserId === CURRENT_USER_ID)
  const received = mine.filter(s => s.toUserId === CURRENT_USER_ID)
  const sent = mine.filter(s => s.fromUserId === CURRENT_USER_ID)
  const [tab, setTab] = useState<'all' | 'received' | 'sent'>('all')
  const list = tab === 'received' ? received : tab === 'sent' ? sent : mine
  const pendingCount = received.filter(s => s.status === 'pending').length

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">交换中心</h1>
      <p className="mt-1 text-sm text-slate-500">
        交换全流程：发起 → 确认 → 上课 → 结算互评。{pendingCount > 0 && <span className="font-medium text-orange-600">你有 {pendingCount} 个请求待处理。</span>}
      </p>
      <div className="mt-5 flex gap-2">
        {([['all', '全部'], ['received', `收到的 ${received.length}`], ['sent', `我发起的 ${sent.length}`]] as const).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={cn('rounded-full border px-4 py-1.5 text-sm', tab === v ? 'border-orange-500 bg-orange-500 text-white' : 'bg-white text-slate-600 hover:border-orange-300')}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-4">
        {list.length === 0 ? (
          <Card><CardContent className="p-10 text-center text-slate-400">暂无交换记录，去技能广场发起第一次交换吧。</CardContent></Card>
        ) : (
          list.map(s => <SwapCard key={s.id} swap={s} />)
        )}
      </div>
    </div>
  )
}
