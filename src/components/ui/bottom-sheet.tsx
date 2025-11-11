// src/components/ui/bottom-sheet.tsx
'use client'

import { X } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BottomSheetProps extends ComponentPropsWithoutRef<'div'> {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: React.ReactNode
}

export const BottomSheet = forwardRef<ElementRef<'div'>, BottomSheetProps>(
  ({ open, onOpenChange, title, description, children, className, ...props }, ref) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      if (open) {
        // Prevent body scroll when bottom sheet is open
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = 'unset'
        }
      }
      document.body.style.overflow = 'unset'
      return undefined
    }, [open])

    if (!mounted) {
      return null
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onOpenChange(false)
      }
    }

    const content = (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-end justify-center transition-all duration-300',
          open ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0 pointer-events-none',
        )}
        role='button'
        tabIndex={0}
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            handleBackdropClick(e as unknown as React.MouseEvent)
          }
        }}
        aria-label='Close bottom sheet'
      >
        <div
          ref={ref}
          className={cn(
            'w-full max-w-md bg-background rounded-t-xl shadow-lg transition-transform duration-300 ease-out',
            'max-h-[85vh] overflow-hidden flex flex-col',
            open ? 'translate-y-0' : 'translate-y-full',
            className,
          )}
          {...props}
        >
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b'>
            <div className='flex-1'>
              {title && <h2 className='text-lg font-semibold leading-none tracking-tight'>{title}</h2>}
              {description && <p className='text-sm text-muted-foreground mt-1'>{description}</p>}
            </div>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0 ml-2' onClick={() => onOpenChange(false)}>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </Button>
          </div>

          {/* Content */}
          <div className='flex-1 overflow-auto'>{children}</div>
        </div>
      </div>
    )

    return createPortal(content, document.body)
  },
)

BottomSheet.displayName = 'BottomSheet'

export default BottomSheet
