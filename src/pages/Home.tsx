import { Link } from 'react-router'
import { ArrowRight, Repeat2, Coins, Search, CalendarCheck, Star, TrendingUp, Users, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/AppStore'

const pains = [
  { icon: '💸', title: '报班太贵', desc: '一节吉他课 200+，一个 Python 班动辄几千，兴趣还没验证就先掏空钱包。' },
  { icon: '😮‍💨', title: '自学难坚持', desc: '收藏夹吃灰、教程看到第 3 集放弃——缺少陪伴、反馈和真正的学习节奏。' },
  { icon: '📦', title: '技能在闲置', desc: '你会的摄影、英语、烘焙，除了朋友圈晒一晒，没有分享和变现的出口。' },
]

const steps = [
  { icon: <Sparkles className="h-6 w-6" />, title: '双向发布', desc: '同时写下「我能教」和「我想学」，一张技能名片完成供需登记。' },
  { icon: <Search className="h-6 w-6" />, title: '智能匹配', desc: '按类目、关键词、城市、上课方式计算匹配度，优先推荐「双向互补」的伙伴。' },
  { icon: <Repeat2 className="h-6 w-6" />, title: '发起交换', desc: '一拍即合就互换；只想单向学习，用技能币结算，互不尴尬。' },
  { icon: <CalendarCheck className="h-6 w-6" />, title: '上课互评', desc: '约定时间完成课程，双方互评沉淀信用，让好老师被更多人看到。' },
]

export default function Home() {
  const { posts, swaps } = useAppStore()
  const teachCount = posts.filter(p => p.type === 'teach').length
  const doneCount = swaps.filter(s => s.status === 'done' || s.status === 'reviewed').length + 128

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <Badge className="mb-6 bg-orange-100 text-orange-700 hover:bg-orange-100">不卖课，只换课</Badge>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
            用你会的，<span className="text-orange-500">换你想学的</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            技换 SkillSwap 是一个技能互换社区：你教我吉他，我教你 Python。
            双向发布、智能匹配、技能币兜底，让每个人都能用最低的成本、最有人情味的方式学会新技能。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/square">
              <Button size="lg" className="bg-orange-500 px-8 hover:bg-orange-600">
                去技能广场逛逛 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/publish">
              <Button size="lg" variant="outline" className="px-8">发布我的技能</Button>
            </Link>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4">
            {[
              { icon: <Users className="h-5 w-5" />, num: '2,300+', label: '技能伙伴' },
              { icon: <Repeat2 className="h-5 w-5" />, num: `${teachCount * 37}`, label: '在架技能' },
              { icon: <TrendingUp className="h-5 w-5" />, num: `${doneCount}`, label: '完成交换' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border bg-white/70 p-4 backdrop-blur">
                <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">{s.icon}</div>
                <div className="text-2xl font-bold text-slate-900">{s.num}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 痛点 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">学技能这件事，卡在了哪里？</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pains.map(p => (
            <Card key={p.title} className="border-slate-200">
              <CardContent className="p-6">
                <div className="text-3xl">{p.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-slate-600">
          我们的答案：<span className="font-semibold text-orange-600">每个人既是学生，也是老师。</span>
          用「交换」代替「购买」，学习成本趋近于零，还能收获一个朋友。
        </p>
      </section>

      {/* 如何运作 */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">四步完成一次技能交换</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border bg-white p-6">
                <span className="absolute right-4 top-4 text-4xl font-black text-slate-100">{i + 1}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">{s.icon}</div>
                <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技能币机制 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100"><Coins className="mr-1 h-3.5 w-3.5" />平台机制</Badge>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">技能币：解决「我想学的，没人想换」</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              纯粹的以物易物有个经典难题——需求很难刚好双向对上。技换引入「技能币」作为缓冲：
              教别人赚币，向别人求学花币。暂时没有匹配也能先学起来，你的每一次付出都被记住、可流通。
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><Star className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />新用户注册即送 120 技能币，够体验 2~3 次课</li>
              <li className="flex gap-2"><Star className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />完成授课即时到账，互评高分还有信用加成</li>
              <li className="flex gap-2"><Star className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />信用分 + 评价体系双重约束，爽约扣分，教学相长</li>
            </ul>
          </div>
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="space-y-4 p-8">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="text-xs text-slate-400">我教「Python 数据分析」给老周</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-medium">完成授课</span>
                  <span className="font-bold text-emerald-600">+30 币</span>
                </div>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="text-xs text-slate-400">向林小满学「吉他弹唱」</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-medium">技能互换</span>
                  <span className="font-bold text-orange-500">0 币 · 互相教学</span>
                </div>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="text-xs text-slate-400">向陈一帆学「人像摄影」</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-medium">技能币预约</span>
                  <span className="font-bold text-rose-500">-60 币</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">你的技能，正是别人找了好久的答案</h2>
        <p className="mt-3 text-slate-400">发布第一张技能名片，只需要 1 分钟。</p>
        <Link to="/publish">
          <Button size="lg" className="mt-6 bg-orange-500 px-10 hover:bg-orange-600">立即发布 <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </Link>
      </section>
    </div>
  )
}
