import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}

export function SkeletonLoader({ className, variant = 'rectangular' }: SkeletonLoaderProps) {
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  }

  return (
    <div className={cn('animate-pulse bg-muted', variantClasses[variant], className)} aria-label='Loading content' />
  )
}

interface SkeletonGroupProps {
  lines?: number
  className?: string
}

export function SkeletonGroup({ lines = 3, className }: SkeletonGroupProps) {
  const skeletonLines = Array.from({ length: lines }, (_, i) => ({
    id: `skeleton-${i}-${Date.now()}`,
    isLast: i === lines - 1,
  }))

  return (
    <div className={cn('space-y-3', className)}>
      {skeletonLines.map((line) => (
        <SkeletonLoader key={line.id} variant='text' className={line.isLast ? 'w-3/4' : undefined} />
      ))}
    </div>
  )
}
