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
 * Component that reveals content when scrolled into view
 * Uses Intersection Observer for optimal performance
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
 * List component that reveals items with staggered timing on scroll
 * Optimized with Intersection Observer
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
