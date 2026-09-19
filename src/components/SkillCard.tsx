import { useState } from 'react'
import { MapPin, Clock, Coins, Repeat2, Star, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AvatarBadge } from '@/components/AvatarBadge'
import { SwapDialog } from '@/components/SwapDialog'
import { getUser } from '@/store/AppStore'
import { MODE_LABEL, type SkillPost } from '@/types'

export function SkillCard({ post }: { post: SkillPost }) {
  const user = getUser(post.userId)
  const [open, setOpen] = useState(false)
  const isTeach = post.type === 'teach'
  const isMe = post.userId === 'me'

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <Badge className={isTeach ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-sky-100 text-sky-700 hover:bg-sky-100'}>
            {isTeach ? '我能教' : '我想学'}
          </Badge>
          <span className="text-xs text-slate-400">{post.category} · {post.level}</span>
        </div>
        <h3 className="text-base font-semibold leading-snug text-slate-900">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-500">{post.description}</p>

        {post.acceptSwap && post.wantsInReturn.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-orange-600">
            <Repeat2 className="h-3.5 w-3.5" />
            想换：{post.wantsInReturn.join('、')}
          </div>
        )}

        <div className="mt-auto space-y-3 pt-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{MODE_LABEL[post.mode]}{post.mode !== 'online' && ` · ${post.city}`}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.durationMin} 分钟/次</span>
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              {post.priceCoins > 0 ? (<><Coins className="h-3.5 w-3.5" />{post.priceCoins} 币/次</>) : '仅互换'}
            </span>
          </div>
          <div className="flex items-center gap-2 border-t pt-3">
            <AvatarBadge user={user} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 text-sm font-medium text-slate-800">
                {user.name}
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />{user.rating}（{user.ratingCount}）
              </div>
            </div>
            {!isMe && isTeach && (
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => setOpen(true)}>
                发起交换
              </Button>
            )}
            {!isMe && !isTeach && (
              <Button size="sm" variant="outline" onClick={() => setOpen(true)}>我能教 TA</Button>
            )}
            {isMe && <Badge variant="secondary">我发布的</Badge>}
          </div>
        </div>
      </CardContent>
      {open && <SwapDialog post={post} onClose={() => setOpen(false)} />}
    </Card>
  )
}
