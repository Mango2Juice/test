/**
 * @fileoverview Scroll reveal component using Intersection Observer for performance.
 * Provides smooth reveal animations when elements enter viewport.
 */

'use client'

import { type ReactNode, useId } from 'react'
import { useScrollReveal } from '@/hooks/useScrollOptimization'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
  delay?: number
  threshold?: number
  triggerOnce?: boolean
}

/**
 * Reveals its children with a configurable entrance animation when the element enters the viewport.
 *
 * Renders a wrapper div that applies initial hidden-state classes for the selected `animation` and switches to the corresponding visible-state classes when the element becomes visible according to the intersection `threshold`. When visible, the component applies `delay` (in milliseconds) to the transition; if `triggerOnce` is true the reveal will not revert when scrolled out of view.
 *
 * @param children - Content to render inside the reveal container.
 * @param className - Optional additional CSS classes applied to the wrapper.
 * @param animation - Animation type to use for the reveal. Supported values: `"fade"`, `"slide-up"`, `"slide-down"`, `"slide-left"`, `"slide-right"`, `"scale"`. Defaults to `"fade"`.
 * @param delay - Transition delay in milliseconds applied when the element becomes visible. Defaults to `0`.
 * @param threshold - IntersectionObserver threshold (0 to 1) that determines how much of the element must be visible before revealing. Defaults to `0.1`.
 * @param triggerOnce - If `true`, the element reveals only on the first intersection and does not hide again. Defaults to `true`.
 * @returns A JSX element wrapping `children` that performs the configured scroll reveal animation.
 */
export function ScrollReveal({
  children,
  className,
  animation = 'fade',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    triggerOnce,
  })

  const animationClasses = {
    fade: 'opacity-0 transition-opacity duration-500',
    'slide-up': 'opacity-0 translate-y-8 transition-[opacity,transform] duration-500',
    'slide-down': 'opacity-0 -translate-y-8 transition-[opacity,transform] duration-500',
    'slide-left': 'opacity-0 translate-x-8 transition-[opacity,transform] duration-500',
    'slide-right': 'opacity-0 -translate-x-8 transition-[opacity,transform] duration-500',
    scale: 'opacity-0 scale-95 transition-[opacity,transform] duration-500',
  }

  const visibleClasses = {
    fade: 'opacity-100',
    'slide-up': 'opacity-100 translate-y-0',
    'slide-down': 'opacity-100 translate-y-0',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0',
    scale: 'opacity-100 scale-100',
  }

  return (
    <div
      ref={ref}
      className={cn(animationClasses[animation], isVisible && visibleClasses[animation], className)}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}

interface ScrollRevealListProps {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
  staggerDelay?: number
  threshold?: number
  triggerOnce?: boolean
}

/**
 * Renders a list of children where each item is wrapped in a ScrollReveal with an incremental (staggered) delay.
 *
 * @param children - Array of React nodes to reveal as list items
 * @param className - Optional CSS classes applied to the outer container
 * @param itemClassName - Optional CSS classes applied to each item wrapper
 * @param animation - Animation type for each item; defaults to `'slide-up'`
 * @param staggerDelay - Milliseconds to add to the delay for each successive item; defaults to `100`
 * @param threshold - IntersectionObserver threshold for visibility; defaults to `0.1`
 * @param triggerOnce - If `true`, each item reveals only on its first intersection; defaults to `true`
 * @returns A container div whose children are rendered as ScrollReveal-wrapped items with staggered delays
 */
export function ScrollRevealList({
  children,
  className,
  itemClassName,
  animation = 'slide-up',
  staggerDelay = 100,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealListProps) {
  const componentId = useId()

  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={`${componentId}-reveal-${index}`}
          animation={animation}
          delay={index * staggerDelay}
          threshold={threshold}
          triggerOnce={triggerOnce}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}