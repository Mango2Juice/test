'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Wraps content to animate a page transition when the route changes, while respecting the user's reduced-motion preference.
 *
 * When reduced motion is preferred, the component renders the current children without animation classes. Otherwise,
 * it triggers an exit animation, replaces the rendered children after a 200ms exit delay, then completes the enter
 * animation after an additional ~50ms. The transition is triggered when the pathname or children change.
 *
 * @param children - The content to render and animate between route changes
 * @returns A div containing `children` with either `page-exit` (during exit) or `page-enter` (during enter) class applied; no animation classes when reduced motion is preferred.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is intentionally included to trigger on route changes
  useEffect(() => {
    // If reduced motion is preferred, skip animations
    if (prefersReducedMotion) {
      setDisplayChildren(children)
      return
    }

    // Start exit animation
    setIsTransitioning(true)

    // Wait for exit animation to complete (200ms)
    const exitTimer = setTimeout(() => {
      // Update content
      setDisplayChildren(children)

      // Start enter animation after a brief delay
      const enterTimer = setTimeout(() => {
        setIsTransitioning(false)
      }, 50)

      return () => clearTimeout(enterTimer)
    }, 200)

    return () => clearTimeout(exitTimer)
  }, [pathname, children, prefersReducedMotion])

  // Don't apply animation classes if reduced motion is preferred
  if (prefersReducedMotion) {
    return <div>{displayChildren}</div>
  }

  return <div className={isTransitioning ? 'page-exit' : 'page-enter'}>{displayChildren}</div>
}