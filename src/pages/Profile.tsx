import { Link } from 'react-router'
import { Coins, ShieldCheck, Star, Trash2, GraduationCap, Presentation } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AvatarBadge } from '@/components/AvatarBadge'
import { useAppStore, getUser } from '@/store/AppStore'
import { CURRENT_USER_ID } from '@/data/seed'
import { MODE_LABEL } from '@/types'

export default function Profile() {
  const { posts, reviews, coins, swaps, removePost } = useAppStore()
  const me = getUser(CURRENT_USER_ID)
  const myPosts = posts.filter(p => p.userId === CURRENT_USER_ID)
  const myReviews = reviews.filter(r => r.toUserId === CURRENT_USER_ID)
  const myDone = swaps.filter(s => (s.status === 'done' || s.status === 'reviewed') && (s.fromUserId === CURRENT_USER_ID || s.toUserId === CURRENT_USER_ID))

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* 个人卡片 */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-orange-400 to-amber-400" />
        <CardContent className="relative p-6 pt-0">
          <div className="-mt-10 flex flex-wrap items-end gap-4">
            <span className="rounded-full bg-white p-1 shadow"><AvatarBadge user={me} size="lg" /></span>
            <div className="pb-1">
              <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
                {me.name} <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="text-sm text-slate-500">{me.title} · {me.city}</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 font-bold text-amber-700">
              <Coins className="h-5 w-5" />{coins} 技能币
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: '信用分', value: `${me.credit}`, extra: <Progress value={me.credit} className="mt-2 h-1.5" /> },
              { label: '综合评分', value: `${me.rating}`, extra: <div className="mt-2 flex gap-0.5">{[1,2,3,4,5].map(n => <Star key={n} className={`h-3.5 w-3.5 ${n <= Math.round(me.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}</div> },
              { label: '教过', value: `${me.taughtCount + myDone.length} 次`, extra: <Presentation className="mt-2 h-4 w-4 text-slate-300" /> },
              { label: '学过', value: `${me.learnedCount} 次`, extra: <GraduationCap className="mt-2 h-4 w-4 text-slate-300" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl border p-4">
                <div className="text-xs text-slate-400">{s.label}</div>
                <div className="mt-1 text-xl font-bold text-slate-900">{s.value}</div>
                {s.extra}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* 我的技能 */}
        <section className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">我发布的技能</h2>
            <Link to="/publish"><Button size="sm" className="bg-orange-500 hover:bg-orange-600">+ 发布</Button></Link>
          </div>
          <div className="mt-4 space-y-3">
            {myPosts.length === 0 && (
              <Card><CardContent className="p-8 text-center text-sm text-slate-400">还没有发布技能，<Link to="/publish" className="text-orange-600 underline">去发布第一张技能名片</Link></CardContent></Card>
            )}
            {myPosts.map(p => (
              <Card key={p.id}>
                <CardContent className="flex items-start gap-3 p-4">
                  <Badge className={p.type === 'teach' ? 'mt-0.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'mt-0.5 bg-sky-100 text-sky-700 hover:bg-sky-100'}>
                    {p.type === 'teach' ? '能教' : '想学'}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900">{p.title}</div>
                    <div className="mt-0.5 text-xs text-slate-400">
                      {p.category} · {p.level} · {MODE_LABEL[p.mode]} · {p.priceCoins > 0 ? `${p.priceCoins} 币/次` : '仅互换'}
                      {p.acceptSwap && p.wantsInReturn.length > 0 && ` · 想换：${p.wantsInReturn.join('、')}`}
                    </div>
                  </div>
                  {p.id.startsWith('p-') && !p.id.startsWith('p-me') && (
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-rose-500" onClick={() => removePost(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 收到的评价 */}
        <section className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">收到的评价</h2>
          <div className="mt-4 space-y-3">
            {myReviews.length === 0 && (
              <Card><CardContent className="p-8 text-center text-sm text-slate-400">完成一次交换后，这里会出现伙伴对你的评价。</CardContent></Card>
            )}
            {myReviews.map(r => {
              const from = getUser(r.fromUserId)
              return (
                <Card key={r.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AvatarBadge user={from} size="sm" />
                      <span className="text-sm font-medium">{from.name}</span>
                      <span className="flex gap-0.5">
                        {[1,2,3,4,5].map(n => <Star key={n} className={`h-3 w-3 ${n <= r.score ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{r.comment}</p>
                    <div className="mt-1 text-xs text-slate-400">关于「{r.skillTitle}」</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
