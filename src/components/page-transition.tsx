'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PageTransitionProps {
  children: ReactNode
}

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
