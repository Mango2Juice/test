'use client'

import { useCallback } from 'react'
import { cn } from '@/lib/utils'

interface SkipLink {
  href: string
  label: string
}

interface SkipLinksProps {
  links: SkipLink[]
  className?: string
}

/**
 * Skip links component for keyboard navigation accessibility
 * Provides quick navigation to main content areas
 */
export function SkipLinks({ links, className }: SkipLinksProps) {
  const handleSkipClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()

    // Remove the # from href to get the target ID
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Focus the target element
      targetElement.focus()

      // If the element is not naturally focusable, make it focusable temporarily
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1')

        // Remove tabindex after focus is lost
        const handleBlur = () => {
          targetElement.removeAttribute('tabindex')
          targetElement.removeEventListener('blur-sm', handleBlur)
        }

        targetElement.addEventListener('blur', handleBlur)
      }

      // Scroll to the element
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  if (links.length === 0) {
    return null
  }

  return (
    <div className={cn('skip-links', className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleSkipClick(e, link.href)}
          className={cn(
            // Position skip links off-screen by default
            'absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden',
            // Show skip links when focused
            'focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible',
            // Styling for visible skip links
            'focus:z-50 focus:bg-primary focus:text-primary-foreground',
            'focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg',
            'focus:text-sm focus:font-medium focus:no-underline',
            // Smooth transitions
            'transition-all duration-200 ease-in-out',
            // Ensure high contrast
            'focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

/**
 * Default skip links for the quick drug reference page
 */
export function QuickReferenceSkipLinks() {
  const skipLinks: SkipLink[] = [
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#weight-input', label: 'Skip to weight input' },
    { href: '#category-filters', label: 'Skip to category filters' },
    { href: '#medication-results', label: 'Skip to medication results' },
  ]

  return <SkipLinks links={skipLinks} />
}
