import { NavLink, useNavigate } from 'react-router'
import { Repeat2, Coins } from 'lucide-react'
import { useAppStore } from '@/store/AppStore'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: '首页' },
  { to: '/square', label: '技能广场' },
  { to: '/publish', label: '发布技能' },
  { to: '/match', label: '智能匹配' },
  { to: '/swaps', label: '交换中心' },
  { to: '/product', label: '产品方案' },
]

export function Navbar() {
  const { coins } = useAppStore()
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 font-bold text-lg mr-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
            <Repeat2 className="h-5 w-5" />
          </span>
          <span>技换<span className="text-orange-500">SkillSwap</span></span>
        </button>
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-sm font-semibold text-amber-700">
            <Coins className="h-4 w-4" /> {coins} 技能币
          </span>
          <NavLink to="/profile" className={({ isActive }) => cn('text-sm font-medium', isActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900')}>
            我的
          </NavLink>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              cn('whitespace-nowrap rounded-full px-3 py-1 text-sm', isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-600')
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
