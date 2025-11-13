import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value?: number
  indeterminate?: boolean
  className?: string
}

export function ProgressBar({ value = 0, indeterminate = false, className }: ProgressBarProps) {
  return (
    <div
      className={cn('h-1 w-full overflow-hidden rounded-full bg-muted', className)}
      role='progressbar'
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {indeterminate ? (
        <div className='h-full w-1/3 bg-primary animate-progress' />
      ) : (
        <div
          className='h-full bg-primary transition-all duration-300 ease-out'
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      )}
    </div>
  )
}
