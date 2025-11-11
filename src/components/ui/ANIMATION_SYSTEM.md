# Animation System

This document describes the comprehensive animation system implemented for the Doses application.

## Overview

The animation system provides:
- Consistent timing functions and durations
- Page transition animations
- Loading state animations (spinner, skeleton, progress, success)
- Reduced motion support for accessibility

## Animation Tokens

### Durations
- `--duration-instant`: 100ms - Immediate feedback
- `--duration-fast`: 200ms - Quick transitions
- `--duration-base`: 300ms - Standard transitions
- `--duration-slow`: 400ms - Deliberate transitions
- `--duration-slower`: 600ms - Emphasis transitions

### Timing Functions
- `--ease-in`: cubic-bezier(0.4, 0, 1, 1)
- `--ease-out`: cubic-bezier(0, 0, 0.2, 1)
- `--ease-in-out`: cubic-bezier(0.4, 0, 0.2, 1)
- `--ease-spring`: cubic-bezier(0.34, 1.56, 0.64, 1) - Bouncy effect
- `--ease-smooth`: cubic-bezier(0.25, 0.46, 0.45, 0.94)

## Components

### LoadingSpinner
Rotating spinner for loading states.

```tsx
import { LoadingSpinner } from '@/components/ui/loading-spinner'

<LoadingSpinner size="md" />
```

Props:
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: Additional CSS classes

### SkeletonLoader
Pulsing placeholder for loading content.

```tsx
import { SkeletonLoader, SkeletonGroup } from '@/components/ui/skeleton-loader'

<SkeletonLoader variant="text" />
<SkeletonGroup lines={3} />
```

Props:
- `variant`: 'text' | 'circular' | 'rectangular' (default: 'rectangular')
- `className`: Additional CSS classes
- `lines`: Number of skeleton lines (SkeletonGroup only)

### SuccessCheckmark
Animated checkmark for success states.

```tsx
import { SuccessCheckmark } from '@/components/ui/success-checkmark'

<SuccessCheckmark size="md" />
```

Props:
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: Additional CSS classes

### ProgressBar
Progress indicator with determinate and indeterminate modes.

```tsx
import { ProgressBar } from '@/components/ui/progress-bar'

<ProgressBar value={50} />
<ProgressBar indeterminate />
```

Props:
- `value`: Progress percentage (0-100)
- `indeterminate`: Show animated indeterminate state
- `className`: Additional CSS classes

### PageTransition
Wrapper for page content with route change animations.

```tsx
import { PageTransition } from '@/components/page-transition'

<PageTransition>
  {children}
</PageTransition>
```

## Hooks

### useReducedMotion
Detects user's reduced motion preference.

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion'

const prefersReducedMotion = useReducedMotion()

if (!prefersReducedMotion) {
  // Apply animations
}
```

## Accessibility

The animation system respects the `prefers-reduced-motion` media query:
- All animations are disabled or minimized when reduced motion is preferred
- Functionality remains intact without animations
- Animation durations are set to 0.01ms to maintain state transitions

## CSS Classes

### Page Transitions
- `.page-exit`: Exit animation (fade out, translateX -20px, 200ms)
- `.page-enter`: Enter animation (fade in, translateX 20px to 0, 300ms with 100ms delay)

### Loading Animations
- `.animate-spin`: Rotating spinner (1s linear infinite)
- `.animate-pulse`: Pulsing effect (2s ease-in-out infinite)
- `.animate-check`: Checkmark draw animation (400ms ease-out)
- `.animate-progress`: Progress bar animation (1.5s ease-in-out infinite)

## Best Practices

1. **Use appropriate durations**: Fast (200ms) for micro-interactions, base (300ms) for standard transitions
2. **Respect reduced motion**: Always check `useReducedMotion()` for custom animations
3. **GPU acceleration**: Use transforms and opacity for smooth 60fps animations
4. **Limit simultaneous animations**: Keep to 3 or fewer concurrent animations
5. **Provide feedback**: Use loading states to indicate progress and completion
