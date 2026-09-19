import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useAppStore } from '@/store/AppStore'
import { CATEGORIES, type Level, type Mode, type PostType } from '@/types'
import { cn } from '@/lib/utils'

export default function Publish() {
  const { addPost } = useAppStore()
  const navigate = useNavigate()

  const [type, setType] = useState<PostType>('teach')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>('音乐')
  const [level, setLevel] = useState<Level>('入门')
  const [mode, setMode] = useState<Mode>('both')
  const [city, setCity] = useState('上海')
  const [durationMin, setDurationMin] = useState(60)
  const [priceCoins, setPriceCoins] = useState(30)
  const [acceptSwap, setAcceptSwap] = useState(true)
  const [wants, setWants] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const submit = () => {
    if (title.trim().length < 4) { setError('标题至少 4 个字，让别人一眼看懂你要教/学什么'); return }
    if (description.trim().length < 10) { setError('描述至少 10 个字，说说你的水平、目标和期望'); return }
    addPost({
      type, title: title.trim(), category, level, mode, city,
      durationMin, priceCoins: acceptSwap ? priceCoins : priceCoins, acceptSwap,
      wantsInReturn: wants.split(/[,，、\s]+/).filter(Boolean),
      description: description.trim(),
    })
    navigate('/profile')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">发布技能</h1>
      <p className="mt-1 text-sm text-slate-500">一张好的技能名片 = 清晰的标题 + 真诚的描述 + 合理的交换期望。</p>

      {/* 类型切换 */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {([
          { v: 'teach' as PostType, icon: '🙋', t: '我能教', d: '分享你的技能，赚技能币或换技能' },
          { v: 'learn' as PostType, icon: '🙌', t: '我想学', d: '说出你想学的，等老师来找你' },
        ]).map(o => (
          <button
            key={o.v}
            onClick={() => setType(o.v)}
            className={cn(
              'rounded-2xl border-2 p-4 text-left transition-colors',
              type === o.v ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-orange-200',
            )}
          >
            <div className="text-2xl">{o.icon}</div>
            <div className="mt-1 font-semibold text-slate-900">{o.t}</div>
            <div className="text-xs text-slate-500">{o.d}</div>
          </button>
        ))}
      </div>

      <Card className="mt-4">
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <Label>标题</Label>
            <Input
              placeholder={type === 'teach' ? '如：吉他弹唱零基础速成' : '如：想学吉他弹唱（零基础）'}
              value={title} onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>类目</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>难度</Label>
              <Select value={level} onValueChange={v => setLevel(v as Level)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{(['入门', '进阶', '精通'] as Level[]).map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>单次时长</Label>
              <Select value={String(durationMin)} onValueChange={v => setDurationMin(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{[45, 60, 90, 120, 180].map(d => <SelectItem key={d} value={String(d)}>{d} 分钟</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>上课方式</Label>
              <Select value={mode} onValueChange={v => setMode(v as Mode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">线上</SelectItem>
                  <SelectItem value="offline">线下</SelectItem>
                  <SelectItem value="both">线上/线下均可</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>城市</Label>
              <Input value={city} onChange={e => setCity(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>详细描述</Label>
            <Textarea
              rows={4}
              placeholder={type === 'teach'
                ? '你的经验水平、教学方式、能提供什么（资料/场地/设备）、适合什么样的学员…'
                : '你的基础、学习目标、希望的节奏和时间安排、可以用什么技能交换…'}
              value={description} onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-800">接受技能互换</div>
                <div className="text-xs text-slate-500">开启后，别人可以用 TA 的技能直接与你交换</div>
              </div>
              <Switch checked={acceptSwap} onCheckedChange={setAcceptSwap} />
            </div>
            {acceptSwap && (
              <div className="mt-3 space-y-2">
                <Label className="text-xs">期望换回的技能（用逗号分隔）</Label>
                <Input placeholder="如：吉他, 摄影, 英语" value={wants} onChange={e => setWants(e.target.value)} />
              </div>
            )}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-slate-800">技能币定价</div>
                <div className="text-xs text-slate-500">0 表示仅接受互换；学习者可设愿付价格</div>
              </div>
              <div className="flex items-center gap-2">
                <Input type="number" min={0} max={200} className="w-24 text-right" value={priceCoins} onChange={e => setPriceCoins(Math.max(0, Number(e.target.value)))} />
                <span className="text-sm text-slate-500">币/次</span>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-rose-500">{error}</p>}
          <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg" onClick={submit}>
            发布{type === 'teach' ? '「我能教」' : '「我想学」'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
