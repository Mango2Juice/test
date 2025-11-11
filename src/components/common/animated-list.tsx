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
 * Renders a list whose children enter with a staggered animation.
 *
 * @param children - Items to render inside the list; each child will be wrapped for animation.
 * @param staggerDelay - Milliseconds between each item's animation start.
 * @param className - Additional className applied to the outer container.
 * @param itemClassName - Additional className applied to each item wrapper.
 * @param animate - When `true`, triggers the staggered animation once on first render; when `false`, items render without delay.
 * @returns The rendered container element that wraps each child with per-item transition delay and active state.
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
 * Animate children in a responsive CSS grid with configurable staggered entrance timing.
 *
 * @param children - Grid items to render.
 * @param columns - Number of grid columns; controls the CSS grid template (default: 3).
 * @param staggerDelay - Delay in milliseconds between successive item animations (default: 50).
 * @param className - Additional className(s) applied to the grid container.
 * @param itemClassName - Additional className(s) applied to each item wrapper.
 * @param animate - If `false`, disables animation and renders items without staggered delays (default: true).
 * @returns A grid container whose children are wrapped in elements that receive staggered transition delays and an `active` class when their animation is active.
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