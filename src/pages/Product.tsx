import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const archGroups = [
  { name: '用户层', color: 'bg-orange-500', items: ['技能名片（能教/想学）', '信用分与评价档案', '技能币钱包'] },
  { name: '匹配层', color: 'bg-sky-500', items: ['类目/关键词召回', '城市与方式过滤', '双向互补加权', '匹配度评分解释'] },
  { name: '交易层', color: 'bg-emerald-500', items: ['交换请求', '双向互换 / 技能币', '状态机流转', '互评结算'] },
  { name: '保障层', color: 'bg-violet-500', items: ['实名与认证', '爽约扣分', '内容审核', '纠纷仲裁'] },
]

const roadmap = [
  { phase: 'MVP（当前版本）', items: '双向发布 · 技能广场 · 智能匹配 · 交换状态机 · 技能币 · 互评信用' },
  { phase: 'V1.5', items: '站内即时沟通 · 课程日历与提醒 · 视频试讲 · 交换保险（爽约赔付）' },
  { phase: 'V2.0', items: '小组共学（1 对多拼课） · 技能图谱推荐 · 城市线下驿站 · 企业团建技能日' },
]

export default function Product() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">产品设计文档</Badge>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">技换 SkillSwap · 产品方案</h1>
      <p className="mt-2 text-slate-500">一页看懂：为什么做、给谁做、怎么做、怎么赚钱、怎么长大。</p>

      {/* 1 痛点与洞察 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">01</span> 痛点与洞察</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { t: '报班贵', d: '兴趣验证成本高：一节体验课几百元，一个系统班几千元，试错代价劝退大多数人。' },
            { t: '自学难坚持', d: '缺反馈、缺节奏、缺同伴。免费教程的完课率普遍不足 10%，学习是社交行为。' },
            { t: '技能闲置', d: '大量业余高手（吉他 10 年、雅思 8 分、烘焙达人）缺少低门槛的分享与变现渠道。' },
          ].map(p => (
            <Card key={p.t}><CardContent className="p-5">
              <h3 className="font-semibold text-slate-900">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.d}</p>
            </CardContent></Card>
          ))}
        </div>
        <Card className="mt-4 border-orange-200 bg-orange-50">
          <CardContent className="p-5 text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-orange-600">核心洞察：</span>
            教与学是同一枚硬币的两面——每个想学的人，几乎都有能教的东西。把「购买课程」重构为「交换技能」，
            资金门槛归零，而「我要教别人」的责任感反过来成为坚持学习的动力。交换的不只是技能，还有陪伴和反馈。
          </CardContent>
        </Card>
      </section>

      {/* 2 目标用户 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">02</span> 目标用户</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { e: '🎓', t: '斜杠青年', d: '22-35 岁，想学第二技能但预算有限；本身有一技之长可交换。冷启动核心人群。' },
            { e: '🧑‍🏫', t: '业余高手', d: '有 5 年以上爱好积累，乐于分享，希望获得认可与额外收入（技能币/现金化）。供给侧引擎。' },
            { e: '🏙️', t: '新城市人', d: '刚换城市工作，希望通过技能交换建立本地社交连接。线下交换的天然用户。' },
          ].map(u => (
            <Card key={u.t}><CardContent className="p-5">
              <div className="text-2xl">{u.e}</div>
              <h3 className="mt-2 font-semibold text-slate-900">{u.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{u.d}</p>
            </CardContent></Card>
          ))}
        </div>
      </section>

      {/* 3 功能架构 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">03</span> 功能架构</h2>
        <div className="mt-4 space-y-3">
          {archGroups.map(g => (
            <div key={g.name} className="flex flex-col gap-3 rounded-2xl border bg-white p-4 sm:flex-row sm:items-center">
              <span className={`${g.color} w-20 shrink-0 rounded-lg px-3 py-2 text-center text-sm font-semibold text-white`}>{g.name}</span>
              <div className="flex flex-wrap gap-2">
                {g.items.map(i => <span key={i} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 核心闭环 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">04</span> 核心交换闭环</h2>
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium">
              {['发布技能名片', '智能匹配', '发起交换', '确认约定', '完成课程', '技能币结算', '双向互评'].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-xl bg-orange-500 px-4 py-2 text-white">{s}</span>
                  {i < arr.length - 1 && <span className="text-slate-300">→</span>}
                </span>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">
              互评沉淀为信用分，信用分提升匹配权重——飞轮转动。本站「交换中心」可完整体验该状态机。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 5 匹配算法 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">05</span> 匹配算法（本站已实现）</h2>
        <Card className="mt-4"><CardContent className="p-6">
          <div className="grid gap-3 text-sm md:grid-cols-2">
            {[
              ['类目一致', '+40 分', '同品类是最强信号'],
              ['关键词相关', '+20 分', '标题/描述/期望换回互相命中'],
              ['方式兼容', '+15 分', '线上/线下意愿不冲突'],
              ['同城', '+10 分', '线下交换的前提'],
              ['难度匹配', '+5 分', '入门配入门，避免错位'],
              ['双向互补', '+25 分', '对方想学的正是你能教的——最高优先级'],
            ].map(([k, s, d]) => (
              <div key={k} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-3">
                <div><div className="font-medium text-slate-800">{k}</div><div className="text-xs text-slate-400">{d}</div></div>
                <span className="font-bold text-orange-500">{s}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            每条匹配都给出可解释的理由（见「智能匹配」页），避免黑盒推荐破坏信任。
          </p>
        </CardContent></Card>
      </section>

      {/* 6 商业模式 + 风控 */}
      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">06</span> 商业模式</h2>
          <Card className="mt-4 h-[calc(100%-3rem)]"><CardContent className="space-y-3 p-6 text-sm text-slate-600">
            <p><span className="font-semibold text-slate-900">技能币充值：</span>币不够用时小额充值，平台抽成授课流水的 8%。</p>
            <p><span className="font-semibold text-slate-900">增值会员：</span>优先曝光、匹配雷达、线下场地券。</p>
            <p><span className="font-semibold text-slate-900">B 端服务：</span>企业内训技能市集、社区团购式拼课。</p>
            <p className="text-xs text-slate-400">原则：交换本身永远免费，平台只在「撮合之外的便利」上收费。</p>
          </CardContent></Card>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">07</span> 信任与风控</h2>
          <Card className="mt-4 h-[calc(100%-3rem)]"><CardContent className="space-y-3 p-6 text-sm text-slate-600">
            <p><span className="font-semibold text-slate-900">双向互评 + 信用分：</span>爽约扣分，低分限流。</p>
            <p><span className="font-semibold text-slate-900">技能币担保：</span>预约先冻结，双方确认完成才结算。</p>
            <p><span className="font-semibold text-slate-900">实名认证与内容审核：</span>线下场景必备安全底线。</p>
            <p><span className="font-semibold text-slate-900">仲裁通道：</span>争议订单人工介入，记录进信用档案。</p>
          </CardContent></Card>
        </div>
      </section>

      {/* 8 路线图 */}
      <section className="mt-10 mb-8">
        <h2 className="text-xl font-bold text-slate-900"><span className="text-orange-500">08</span> 迭代路线</h2>
        <div className="mt-4 space-y-3">
          {roadmap.map(r => (
            <Card key={r.phase}><CardContent className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center">
              <Badge className="w-fit shrink-0 bg-slate-900 text-white hover:bg-slate-900">{r.phase}</Badge>
              <span className="text-sm text-slate-600">{r.items}</span>
            </CardContent></Card>
          ))}
        </div>
      </section>
    </div>
  )
}
