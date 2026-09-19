import type { User } from '@/types'
import { cn } from '@/lib/utils'

export function AvatarBadge({ user, size = 'md' }: { user: User; size?: 'sm' | 'md' | 'lg' }) {
  const cls = size === 'sm' ? 'h-8 w-8 text-base' : size === 'lg' ? 'h-14 w-14 text-2xl' : 'h-10 w-10 text-lg'
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full font-bold', cls)}
      style={{ backgroundColor: user.color + '22', border: `2px solid ${user.color}55` }}
    >
      {user.emoji}
    </span>
  )
}
