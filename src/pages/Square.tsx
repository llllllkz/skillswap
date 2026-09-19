import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SkillCard } from '@/components/SkillCard'
import { useAppStore } from '@/store/AppStore'
import { CATEGORIES } from '@/types'
import { cn } from '@/lib/utils'

export default function Square() {
  const { posts } = useAppStore()
  const [tab, setTab] = useState('all')
  const [category, setCategory] = useState('全部')
  const [keyword, setKeyword] = useState('')

  const filtered = useMemo(() => {
    return posts.filter(p => {
      if (tab !== 'all' && p.type !== tab) return false
      if (category !== '全部' && p.category !== category) return false
      if (keyword) {
        const k = keyword.toLowerCase()
        const text = `${p.title} ${p.description} ${p.category} ${p.wantsInReturn.join(' ')}`.toLowerCase()
        if (!text.includes(k)) return false
      }
      return true
    })
  }, [posts, tab, category, keyword])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">技能广场</h1>
          <p className="mt-1 text-sm text-slate-500">这里每个人都是老师，也都是学生。看到心动的技能，直接发起交换。</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-9" placeholder="搜索技能，如：吉他 / Python / 摄影" value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="teach">🙋 我能教</TabsTrigger>
            <TabsTrigger value="learn">🙌 我想学</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap gap-2">
          {['全部', ...CATEGORIES].map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition-colors',
                category === c ? 'border-orange-500 bg-orange-500 text-white' : 'bg-white text-slate-600 hover:border-orange-300',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-slate-400">
          <div className="text-4xl">🔍</div>
          <p className="mt-3">没有找到相关技能，换个关键词试试？或者成为第一个发布的人！</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => <SkillCard key={p.id} post={p} />)}
        </div>
      )}
    </div>
  )
}
