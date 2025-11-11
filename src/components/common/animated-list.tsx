/**
 * @fileoverview Animated list component with staggered animations and performance optimizations.
 * Limits simultaneous animations to maintain 60fps performance.
 */

'use client'

import { type ReactNode, useEffect, useId, useRef } from 'react'
import { useStaggeredAnimation } from '@/hooks/useAnimationQueue'
import { cn } from '@/lib/utils'

interface AnimatedListProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
  itemClassName?: string
  animate?: boolean
}

/**
 * List component that animates children with staggered timing
 * Automatically limits animations for performance
 */
export function AnimatedList({
  children,
  staggerDelay = 50,
  className,
  itemClassName,
  animate = true,
}: AnimatedListProps) {
  const { startStaggered, isActive, reset } = useStaggeredAnimation(children.length, staggerDelay)
  const hasAnimatedRef = useRef(false)
  const componentId = useId()

  useEffect(() => {
    if (animate && !hasAnimatedRef.current) {
      startStaggered()
      hasAnimatedRef.current = true
    }

    return () => {
      reset()
    }
  }, [animate, startStaggered, reset])

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={`${componentId}-item-${index}`}
          className={cn('stagger-item', isActive(index) && 'active', itemClassName)}
          style={{
            transitionDelay: animate ? `${index * staggerDelay}ms` : '0ms',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

interface AnimatedGridProps {
  children: ReactNode[]
  columns?: number
  staggerDelay?: number
  className?: string
  itemClassName?: string
  animate?: boolean
}

/**
 * Grid component that animates children with staggered timing
 * Optimized for performance with limited simultaneous animations
 */
export function AnimatedGrid({
  children,
  columns = 3,
  staggerDelay = 50,
  className,
  itemClassName,
  animate = true,
}: AnimatedGridProps) {
  const { startStaggered, isActive, reset } = useStaggeredAnimation(children.length, staggerDelay)
  const hasAnimatedRef = useRef(false)
  const componentId = useId()

  useEffect(() => {
    if (animate && !hasAnimatedRef.current) {
      startStaggered()
      hasAnimatedRef.current = true
    }

    return () => {
      reset()
    }
  }, [animate, startStaggered, reset])

  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children.map((child, index) => (
        <div
          key={`${componentId}-grid-${index}`}
          className={cn('stagger-item', isActive(index) && 'active', itemClassName)}
          style={{
            transitionDelay: animate ? `${index * staggerDelay}ms` : '0ms',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
