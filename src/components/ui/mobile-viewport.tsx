/**
 * @fileoverview Mobile viewport component for handling keyboard appearance and viewport adjustments
 */

import { type ComponentProps, forwardRef, useEffect } from 'react'
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard'
import { cn } from '@/lib/utils'

export interface MobileViewportProps extends ComponentProps<'div'> {
  /**
   * Whether to automatically adjust for keyboard
   */
  adjustForKeyboard?: boolean

  /**
   * Whether to add safe area padding
   */
  addSafeArea?: boolean

  /**
   * Custom keyboard adjustment behavior
   */
  keyboardAdjustment?: 'none' | 'padding' | 'height' | 'scroll'
}

/**
 * Mobile viewport wrapper that handles keyboard appearance and safe areas
 */
const MobileViewport = forwardRef<HTMLDivElement, MobileViewportProps>(
  (
    {
      className,
      children,
      adjustForKeyboard = true,
      addSafeArea = true,
      keyboardAdjustment = 'padding',
      style,
      ...props
    },
    ref,
  ) => {
    const { keyboard, getViewportStyles } = useMobileKeyboard({
      adjustViewport: adjustForKeyboard,
    })

    // Apply viewport meta tag adjustments for better mobile experience
    useEffect(() => {
      const metaViewport = document.querySelector('meta[name="viewport"]')
      if (metaViewport) {
        const currentContent = metaViewport.getAttribute('content') || ''

        // Ensure proper viewport settings for mobile keyboard handling
        if (!currentContent.includes('viewport-fit=cover')) {
          metaViewport.setAttribute('content', `${currentContent}, viewport-fit=cover`)
        }

        // Add interactive-widget=resizes-content for better keyboard handling on supported browsers
        if (!currentContent.includes('interactive-widget')) {
          metaViewport.setAttribute('content', `${currentContent}, interactive-widget=resizes-content`)
        }
      }
    }, [])

    const getKeyboardStyles = () => {
      if (!(adjustForKeyboard && keyboard.isVisible)) return {}

      const baseStyles = getViewportStyles()

      switch (keyboardAdjustment) {
        case 'padding':
          return {
            ...baseStyles,
            paddingBottom: `${keyboard.height}px`,
          }
        case 'height':
          return {
            ...baseStyles,
            height: `${keyboard.viewportHeight}px`,
            maxHeight: `${keyboard.viewportHeight}px`,
          }
        case 'scroll':
          return {
            ...baseStyles,
            maxHeight: `${keyboard.viewportHeight}px`,
            overflowY: 'auto' as const,
          }
        default:
          return baseStyles
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base mobile viewport classes
          'relative w-full',

          // Safe area support
          addSafeArea && [
            'pb-safe-area-inset-bottom',
            'pl-safe-area-inset-left',
            'pr-safe-area-inset-right',
            'pt-safe-area-inset-top',
          ],

          // Keyboard adjustment classes
          adjustForKeyboard && keyboard.isVisible && [keyboardAdjustment === 'scroll' && 'overflow-y-auto'],

          className,
        )}
        style={{
          ...getKeyboardStyles(),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)
MobileViewport.displayName = 'MobileViewport'

export { MobileViewport }
