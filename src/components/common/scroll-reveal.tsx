/**
 * @fileoverview Scroll reveal component using Intersection Observer for performance.
 * Provides smooth reveal animations when elements enter viewport.
 */
'use client'

import { Children, type ReactNode, useId } from 'react'
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
 * Wraps content in a container that reveals with a configurable animation when it enters the viewport.
 *
 * The component toggles between hidden and visible CSS states based on intersection visibility and applies
 * an optional transition delay to stagger or offset the reveal.
 *
 * @param children - Content to render inside the reveal container.
 * @param className - Additional CSS classes applied to the container.
 * @param animation - Reveal animation type: 'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', or 'scale'.
 * @param delay - Transition delay in milliseconds applied when the element becomes visible.
 * @param threshold - Intersection Observer threshold used to determine visibility (0 to 1).
 * @param triggerOnce - If true, the reveal occurs only the first time the element becomes visible.
 * @returns The wrapper element that reveals its children when scrolled into view.
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
  children: ReactNode
  className?: string
  itemClassName?: string
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
  staggerDelay?: number
  threshold?: number
  triggerOnce?: boolean
}

/**
 * Wraps a list of children and reveals each item with a staggered scroll-based animation.
 *
 * @param children - Array of items to render and reveal in order
 * @param className - CSS classes applied to the outer wrapper element
 * @param itemClassName - CSS classes applied to each item wrapper
 * @param animation - Animation style to apply to each item (e.g., `'fade'`, `'slide-up'`, `'scale'`)
 * @param staggerDelay - Milliseconds to wait between the start of each successive item's reveal
 * @param threshold - Intersection Observer threshold that determines when an item is considered visible
 * @param triggerOnce - If `true`, each item will reveal only the first time it becomes visible
 * @returns A wrapper element containing the provided children where each child is revealed according to the configured animation and stagger timing
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
  const childArray = Children.toArray(children)

  return (
    <div className={className}>
      {childArray.map((child, index) => (
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