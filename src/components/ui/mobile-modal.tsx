// src/components/ui/mobile-modal.tsx
'use client'

import { ArrowLeft, X } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileModalProps extends ComponentPropsWithoutRef<'div'> {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: React.ReactNode
  showBackButton?: boolean
  onBack?: () => void
  fullScreen?: boolean
}

export const MobileModal = forwardRef<ElementRef<'div'>, MobileModalProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      showBackButton = false,
      onBack,
      fullScreen = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      if (open) {
        // Prevent body scroll when modal is open
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
      if (!fullScreen && e.target === e.currentTarget) {
        onOpenChange(false)
      }
    }

    const handleBack = () => {
      if (onBack) {
        onBack()
      } else {
        onOpenChange(false)
      }
    }

    const content = (
      <div
        className={cn(
          'fixed inset-0 z-50 transition-all duration-300',
          fullScreen ? 'bg-background' : 'flex items-center justify-center bg-black/50',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
          role='dialog'
        tabIndex={0}
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            e.stopPropagation()
            // Close the modal on Escape. Do not reuse the backdrop mouse handler
            // because it relies on MouseEvent properties (e.target === e.currentTarget).
            onOpenChange(false)
          }
        }}
        aria-label='Close modal'
      >
        <div
          ref={ref}
          className={cn(
            'flex flex-col transition-transform duration-300 ease-out',
            fullScreen ? 'w-full h-full' : 'w-full max-w-md max-h-[90vh] bg-background rounded-lg shadow-lg mx-4',
            open ? 'translate-y-0' : fullScreen ? 'translate-x-full' : 'translate-y-4 scale-95',
            className,
          )}
          {...props}
        >
          {/* Header */}
          <div className={cn('flex items-center justify-between border-b', fullScreen ? 'p-4 min-h-[60px]' : 'p-4')}>
            <div className='flex items-center gap-3 flex-1'>
              {showBackButton && (
                <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={handleBack}>
                  <ArrowLeft className='h-4 w-4' />
                  <span className='sr-only'>Back</span>
                </Button>
              )}
              <div className='flex-1'>
                {title && <h2 className='text-lg font-semibold leading-none tracking-tight'>{title}</h2>}
                {description && <p className='text-sm text-muted-foreground mt-1'>{description}</p>}
              </div>
            </div>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0 ml-2' onClick={() => onOpenChange(false)}>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </Button>
          </div>

          {/* Content */}
          <div className={cn('flex-1 overflow-auto', fullScreen ? 'p-4' : 'p-4')}>{children}</div>
        </div>
      </div>
    )

    return createPortal(content, document.body)
  },
)

MobileModal.displayName = 'MobileModal'

export default MobileModal
