import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Coins, Repeat2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useAppStore, getUser } from '@/store/AppStore'
import { CURRENT_USER_ID } from '@/data/seed'
import type { SkillPost } from '@/types'

export function SwapDialog({ post, onClose }: { post: SkillPost; onClose: () => void }) {
  const { posts, coins, createSwap } = useAppStore()
  const navigate = useNavigate()
  const user = getUser(post.userId)
  const myTeachPosts = posts.filter(p => p.userId === CURRENT_USER_ID && p.type === 'teach')

  const isLearnCard = post.type === 'learn'
  const [way, setWay] = useState<'swap' | 'coins'>(isLearnCard ? 'swap' : post.acceptSwap && myTeachPosts.length > 0 ? 'swap' : 'coins')
  const [givePostId, setGivePostId] = useState<string>(myTeachPosts[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)

  const payCoins = way === 'coins' ? post.priceCoins : 0
  const canSubmit = isLearnCard
    ? !!givePostId
    : way === 'swap' ? !!givePostId : coins >= post.priceCoins

  const submit = () => {
    if (isLearnCard) {
      // 我来教 TA：teachPostId 用我的帖子，对方完成时付币给我
      createSwap({
        toUserId: post.userId,
        teachPostId: givePostId,
        givePostId: undefined,
        payCoins: post.priceCoins,
        message: message || `我看到你想学「${post.title}」，我可以教你，看看我的技能吧！`,
        direction: 'teach',
      })
    } else {
      createSwap({
        toUserId: post.userId,
        teachPostId: post.id,
        givePostId: way === 'swap' ? givePostId : undefined,
        payCoins,
        message: message || (way === 'swap' ? '我们用技能互换吧，互不花钱！' : '我想预约你的课，技能币支付。'),
        direction: 'learn',
      })
    }
    setDone(true)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {done ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">🎉</div>
            <DialogTitle>交换请求已发送</DialogTitle>
            <p className="text-sm text-slate-500">已通知 {user.name}，可在「交换中心」查看进度。对方接受后记得按时上课哦。</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>继续逛逛</Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => navigate('/swaps')}>去交换中心</Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{isLearnCard ? `我来教 ${user.name}` : `向 ${user.name} 发起交换`}</DialogTitle>
              <DialogDescription className="line-clamp-1">{isLearnCard ? `TA 想学：${post.title}` : post.title}</DialogDescription>
            </DialogHeader>

            {isLearnCard ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">选择你要教 TA 的技能：</p>
                {myTeachPosts.length === 0 ? (
                  <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                    你还没有发布「我能教」的技能，先去发布一个吧。
                    <Button size="sm" variant="link" className="text-orange-600" onClick={() => navigate('/publish')}>去发布 →</Button>
                  </div>
                ) : (
                  <RadioGroup value={givePostId} onValueChange={setGivePostId} className="space-y-2">
                    {myTeachPosts.map(p => (
                      <Label key={p.id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:border-orange-300">
                        <RadioGroupItem value={p.id} />
                        <span className="text-sm">{p.title}<span className="ml-2 text-xs text-slate-400">{p.category} · {p.level}</span></span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                {post.priceCoins > 0 && (
                  <p className="flex items-center gap-1 text-xs text-amber-600"><Coins className="h-3.5 w-3.5" />TA 愿意支付 {post.priceCoins} 技能币/次</p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <RadioGroup value={way} onValueChange={(v) => setWay(v as 'swap' | 'coins')} className="space-y-2">
                  {post.acceptSwap && (
                    <Label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:border-orange-300">
                      <RadioGroupItem value="swap" className="mt-1" />
                      <span>
                        <span className="flex items-center gap-1.5 text-sm font-medium"><Repeat2 className="h-4 w-4 text-orange-500" />技能互换（免费）</span>
                        <span className="text-xs text-slate-500">用我会的技能换 TA 的技能{post.wantsInReturn.length > 0 && `，TA 想换：${post.wantsInReturn.join('、')}`}</span>
                      </span>
                    </Label>
                  )}
                  {post.priceCoins > 0 && (
                    <Label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:border-orange-300">
                      <RadioGroupItem value="coins" className="mt-1" />
                      <span>
                        <span className="flex items-center gap-1.5 text-sm font-medium"><Coins className="h-4 w-4 text-amber-500" />技能币预约（{post.priceCoins} 币/次）</span>
                        <span className="text-xs text-slate-500">余额 {coins} 币{coins < post.priceCoins && '，余额不足'}</span>
                      </span>
                    </Label>
                  )}
                </RadioGroup>

                {way === 'swap' && (
                  myTeachPosts.length === 0 ? (
                    <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                      互换需要你也有「我能教」的技能。
                      <Button size="sm" variant="link" className="text-orange-600" onClick={() => navigate('/publish')}>去发布 →</Button>
                    </div>
                  ) : (
                    <RadioGroup value={givePostId} onValueChange={setGivePostId} className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">我用来交换的技能：</p>
                      {myTeachPosts.map(p => (
                        <Label key={p.id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:border-orange-300">
                          <RadioGroupItem value={p.id} />
                          <span className="text-sm">{p.title}<span className="ml-2 text-xs text-slate-400">{p.category} · {p.level}</span></span>
                        </Label>
                      ))}
                    </RadioGroup>
                  )
                )}
              </div>
            )}

            <Textarea
              placeholder={`给 ${user.name} 留个言吧，比如你的时间安排…`}
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
            />
            <Button className="w-full bg-orange-500 hover:bg-orange-600" disabled={!canSubmit} onClick={submit}>
              {isLearnCard ? '发送授课邀请' : way === 'swap' ? '发送互换请求' : `支付 ${payCoins} 币并预约`}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
