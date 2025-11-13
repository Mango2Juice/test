/**
 * @fileoverview Hook for handling mobile keyboard interactions and viewport adjustments
 */

import { useCallback, useEffect, useRef, useState } from 'react'

interface MobileKeyboardState {
  isVisible: boolean
  height: number
  viewportHeight: number
}

interface UseMobileKeyboardOptions {
  /**
   * Whether to automatically adjust viewport when keyboard appears
   */
  adjustViewport?: boolean
  /**
   * Callback when keyboard visibility changes
   */
  onKeyboardToggle?: (isVisible: boolean, height: number) => void
}

/**
 * Determines the new keyboard state based on viewport height changes.
 * @param initialHeight The initial height of the viewport before the keyboard appeared.
 * @param currentHeight The current height of the viewport.
 * @returns The new MobileKeyboardState.
 */
function getNewKeyboardState(
  initialHeight: number,
  currentHeight: number,
): Omit<MobileKeyboardState, 'viewportHeight'> {
  // A significant reduction in viewport height indicates the keyboard is visible.
  const KEYBOARD_THRESHOLD_PX = 150
  const heightDifference = initialHeight - currentHeight
  const isKeyboardVisible = heightDifference > KEYBOARD_THRESHOLD_PX
  const keyboardHeight = isKeyboardVisible ? heightDifference : 0

  return {
    isVisible: isKeyboardVisible,
    height: keyboardHeight,
  }
}

/**
 * Hook for managing mobile keyboard interactions and viewport adjustments
 * @lintignore
 */
export function useMobileKeyboard(options: UseMobileKeyboardOptions = {}) {
  const { adjustViewport = true, onKeyboardToggle } = options

  const [keyboardState, setKeyboardState] = useState<MobileKeyboardState>({
    isVisible: false,
    height: 0,
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const initialViewportHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 0)
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()

  const handleViewportChange = useCallback(() => {
    if (typeof window === 'undefined') return

    // Clear any existing timeout to debounce the event
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Debounce to avoid rapid updates during animations
    debounceTimeoutRef.current = setTimeout(() => {
      const currentViewportHeight = window.innerHeight
      const newKeyboardMetrics = getNewKeyboardState(initialViewportHeight.current, currentViewportHeight)

      setKeyboardState((previousState) => {
        const newState = {
          ...newKeyboardMetrics,
          viewportHeight: currentViewportHeight,
        }

        // Only call the callback if the visibility state has actually changed
        if (previousState.isVisible !== newState.isVisible) {
          onKeyboardToggle?.(newState.isVisible, newState.height)
        }

        return newState
      })
    }, 100)
  }, [onKeyboardToggle])

  // Initialize viewport height on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    initialViewportHeight.current = window.innerHeight
    setKeyboardState((prev) => ({
      ...prev,
      viewportHeight: window.innerHeight,
    }))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !adjustViewport) {
      return
    }

    const eventTarget = window.visualViewport ?? window
    eventTarget.addEventListener('resize', handleViewportChange)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      eventTarget.removeEventListener('resize', handleViewportChange)
    }
  }, [adjustViewport, handleViewportChange])

  /**
   * Scroll an element into view when keyboard appears
   */
  const scrollIntoView = useCallback(
    (element: HTMLElement, options?: ScrollIntoViewOptions) => {
      if (keyboardState.isVisible) {
        // Add a small delay to ensure keyboard is fully visible
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            ...options,
          })
        }, 300)
      }
    },
    [keyboardState.isVisible],
  )

  /**
   * Get CSS custom properties for viewport adjustments
   */
  const getViewportStyles = useCallback(() => {
    if (!adjustViewport) return {}

    return {
      '--keyboard-height': `${keyboardState.height}px`,
      '--viewport-height': `${keyboardState.viewportHeight}px`,
      '--available-height': `${keyboardState.viewportHeight}px`,
    } as React.CSSProperties
  }, [adjustViewport, keyboardState])

  return {
    keyboard: keyboardState,
    scrollIntoView,
    getViewportStyles,
  }
}
