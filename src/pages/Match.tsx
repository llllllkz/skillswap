import { useState } from 'react'
import { Link } from 'react-router'
import { Sparkles, Repeat2, ArrowRight, Star, MapPin, Clock, Coins } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AvatarBadge } from '@/components/AvatarBadge'
import { SwapDialog } from '@/components/SwapDialog'
import { useAppStore, findMatches, getUser, type MatchResult } from '@/store/AppStore'
import { CURRENT_USER_ID } from '@/data/seed'
import { MODE_LABEL } from '@/types'

function MatchCard({ m }: { m: MatchResult }) {
  const [open, setOpen] = useState(false)
  return (
    <Card className={m.mutual ? 'border-orange-300 bg-orange-50/40' : ''}>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <AvatarBadge user={m.teacher} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-900">{m.teacher.name}</span>
              <span className="flex items-center gap-0.5 text-xs text-amber-600"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{m.teacher.rating}</span>
              {m.mutual && (
                <Badge className="bg-orange-500 text-white hover:bg-orange-500"><Repeat2 className="mr-1 h-3 w-3" />双向互补</Badge>
              )}
            </div>
            <div className="text-xs text-slate-500">{m.teacher.title} · {m.teacher.city}</div>
            <h3 className="mt-2 font-medium text-slate-900">{m.teachPost.title}</h3>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{MODE_LABEL[m.teachPost.mode]} · {m.teachPost.city}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{m.teachPost.durationMin} 分钟</span>
              <span className="flex items-center gap-1 text-amber-600"><Coins className="h-3 w-3" />{m.teachPost.priceCoins > 0 ? `${m.teachPost.priceCoins} 币` : '仅互换'}</span>
            </div>
          </div>
          <div className="w-24 shrink-0 text-right">
            <div className="text-2xl font-black text-orange-500">{m.score}<span className="text-sm font-normal text-slate-400">分</span></div>
            <Progress value={m.score} className="mt-1 h-1.5" />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {m.reasons.map(r => (
            <span key={r} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{r}</span>
          ))}
        </div>
        {m.mutualPost && (
          <div className="mt-3 rounded-lg bg-orange-100/70 px-3 py-2 text-xs text-orange-700">
            💡 TA 正在学「{m.mutualPost.title}」——你教 TA，TA 教你，一分钱不用花。
          </div>
        )}
        <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600" onClick={() => setOpen(true)}>
          发起交换
        </Button>
      </CardContent>
      {open && <SwapDialog post={m.teachPost} onClose={() => setOpen(false)} />}
    </Card>
  )
}

export default function Match() {
  const { posts } = useAppStore()
  const myWants = posts.filter(p => p.userId === CURRENT_USER_ID && p.type === 'learn')
  const myTeach = posts.filter(p => p.userId === CURRENT_USER_ID && p.type === 'teach')

  // 谁想学我能教的
  const demanders = posts.filter(p => {
    if (p.userId === CURRENT_USER_ID || p.type !== 'learn') return false
    return myTeach.some(t => t.category === p.category || p.wantsInReturn.some(w => t.title.includes(w)))
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold text-slate-900">智能匹配</h1>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        基于你的「想学」与「能教」，按类目、关键词、城市、上课方式、双向互补关系综合打分。
      </p>

      {myWants.length === 0 ? (
        <Card className="mt-8"><CardContent className="p-10 text-center text-slate-500">
          你还没有发布「我想学」。<Link to="/publish" className="text-orange-600 underline">先发布一个想学的心愿</Link>，匹配引擎立刻开工。
        </CardContent></Card>
      ) : (
        myWants.map(want => {
          const matches = findMatches(want, posts)
          return (
            <section key={want.id} className="mt-10">
              <div className="flex items-center gap-2">
                <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100">我想学</Badge>
                <h2 className="text-lg font-semibold text-slate-900">{want.title}</h2>
                <span className="text-sm text-slate-400">找到 {matches.length} 位匹配老师</span>
              </div>
              {matches.length === 0 ? (
                <p className="mt-4 text-sm text-slate-400">暂时没有匹配，去广场逛逛或等新成员加入。</p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {matches.map(m => <MatchCard key={m.teachPost.id} m={m} />)}
                </div>
              )}
            </section>
          )
        })
      )}

      <section className="mt-14">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">我能教</Badge>
          <h2 className="text-lg font-semibold text-slate-900">这些人正在找你</h2>
        </div>
        {demanders.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">暂时没有想学你技能的人，保持发布，机会会来。</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demanders.map(d => {
              const u = getUser(d.userId)
              return (
                <Card key={d.id}>
                  <CardContent className="flex items-start gap-3 p-4">
                    <AvatarBadge user={u} />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900">{u.name} <span className="text-xs font-normal text-slate-400">{u.city}</span></div>
                      <div className="mt-0.5 line-clamp-1 text-sm text-slate-600">想学：{d.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{d.priceCoins > 0 ? `愿付 ${d.priceCoins} 币/次` : '希望技能互换'}</div>
                    </div>
                    <Link to="/square">
                      <Button size="sm" variant="outline" className="shrink-0">去回应<ArrowRight className="ml-1 h-3 w-3" /></Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
