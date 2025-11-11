# Performance Optimizations

This document outlines the performance optimizations implemented to ensure 60fps animations throughout the application.

## GPU-Accelerated Animations

### Implementation

All animations use GPU-accelerated CSS properties:

- **Transform**: `translate`, `scale`, `rotate` instead of `top`, `left`, `width`, `height`
- **Opacity**: For fade effects instead of `visibility` or `display`
- **Backface Visibility**: Set to `hidden` for better performance
- **Transform 3D**: Using `translateZ(0)` to trigger GPU acceleration

### CSS Classes

```css
.will-animate-transform {
  will-change: transform;
}

.will-animate-opacity {
  will-change: opacity;
}

.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### Component Updates

- **Butt`transition-[transform,opacity,box-shadow]` instead of `transition-all`
- **Card**: Uses `transition-[transform,opacity,box-shadow]` with `will-animate-transform` for interactive cards
- **Input**: Uses `transition-[border-color,box-shadow,opacity]` for focused transitions

### Best Practices

1. Use `will-change` sparingly - only on elements that will definitely animate
2. Remove `will-change` after animation completes with `will-change: auto`
3. Avoid animating `width`, `height`, `margin`, or `padding`
4. Prefer `transform` and `opacity` for all animations

## Animation Queue System

### Purpose

Limits simultaneous animations to maintain 60fps performance by queuing animations and processing them with controlled concurrency.

### Implementation

**Hook**: `useAnimationQueue`

```typescript
const { addToQueue, removeFromQueue, isAnimating } = useAnimationQueue({
  maxConcurrent: 3,
  staggerDelay: 50
})
```

### Features

- Maximum 3 simultaneous animations
- Priority-based queue processing
- Automatic staggering with configurable delay
- Promise-based animation callbacks
- Cleanup on unmount

### Components

**AnimatedList**: Staggered list animations with performance limits

```tsx
<AnimatedList staggerDelay={50} animate={true}>
  {items.map(item => <Item key={item.id} {...item} />)}
</AnimatedList>
```

**AnimatedGrid**: Grid layout with staggered animations

```tsx
<AnimatedGrid columns={3} staggerDelay={50}>
  {items.map(item => <Card key={item.id} {...item} />)}
</AnimatedGrid>
```

### Staggered Animation Hook

**Hook**: `useStaggeredAnimation`

```typescript
const { startStaggered, isActive, reset } = useStaggeredAnimation(count, delay)
```

Automatically manages timing for multiple element animations with configurable delays.

## Scroll Performance Optimizations

### Passive Event Listeners

All scroll event listeners use `{ passive: true }` to prevent blocking the main thread:

```typescript
window.addEventListener('scroll', handleScroll, { passive: true })
```

### Throttling

Scroll handlers are throttled using `requestAnimationFrame` to limit execution frequency:

**Hook**: `useOptimizedScroll`

```typescript
useOptimizedScroll((scrollY) => {
  // Handle scroll with automatic throttling
}, { throttleMs: 100, passive: true })
```

### Intersection Observer

Scroll-based reveals use Intersection Observer API instead of scroll event listeners:

**Hook**: `useScrollReveal`

```typescript
const { ref, isVisible } = useScrollReveal({
  threshold: 0.1,
  rootMargin: '0px',
  triggerOnce: true
})
```

**Component**: `ScrollReveal`

```tsx
<ScrollReveal animation="slide-up" threshold={0.1}>
  <Content />
</ScrollReveal>
```

### Benefits

- No scroll event listeners needed for visibility detection
- Automatic performance optimization by browser
- Configurable thresholds and root margins
- Optional trigger-once behavior

### Additional Hooks

**useScrollDirection**: Track scroll direction with throttling

```typescript
const direction = useScrollDirection(threshold)
// Returns: 'up' | 'down' | null
```

**useLazyLoad**: Lazy load images on scroll

```typescript
const { ref, isLoaded } = useLazyLoad()
<img ref={ref} data-src="image.jpg" />
```

**useThrottle**: Generic throttle hook

```typescript
const throttledFn = useThrottle(callback, delay)
```

### CSS Optimizations

```css
/* Smooth scrolling with performance */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Optimize scrolling containers */
.scroll-optimized {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  overscroll-behavior-y: contain;
}

/* Contain layout shifts */
.scroll-container {
  contain: layout style paint;
}

/* Passive scroll hint */
.passive-scroll {
  touch-action: pan-y;
}
```

## Performance Monitoring

### Metrics to Track

1. **Frame Rate**: Target 60fps during animations
2. **Animation Duration**: Keep under 400ms for most animations
3. **Simultaneous Animations**: Max 3 at once
4. **Scroll Performance**: Throttled to 100ms intervals
5. **Intersection Observer**: Preferred over scroll listeners

### Testing

Use Chrome DevTools Performance profiler to:

1. Record animation sequences
2. Check frame rate (should stay at 60fps)
3. Identify layout thrashing
4. Monitor main thread blocking
5. Verify GPU acceleration (look for "Composite Layers")

### Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }

  .will-animate,
  .will-animate-transform,
  .will-animate-opacity {
    will-change: auto;
  }
}
```

## Best Practices Summary

### Do's

✅ Use `transform` and `opacity` for animations
✅ Apply `will-change` only to animating elements
✅ Limit simultaneous animations to 3
✅ Use Intersection Observer for scroll reveals
✅ Throttle scroll handlers with RAF
✅ Use passive event listeners
✅ Remove `will-change` after animations
✅ Test with Performance profiler
✅ Support reduced motion preferences

### Don'ts

❌ Animate `width`, `height`, `margin`, `padding`
❌ Use `transition-all` (specify properties)
❌ Apply `will-change` to all elements
❌ Run unlimited simultaneous animations
❌ Use scroll listeners for visibility detection
❌ Block main thread with heavy scroll handlers
❌ Forget to cleanup event listeners
❌ Ignore reduced motion preferences

## File Reference

### Hooks
- `src/hooks/useAnimationQueue.ts` - Animation queue management
- `src/hooks/useScrollOptimization.ts` - Scroll performance hooks

### Components
- `src/components/common/animated-list.tsx` - Animated list/grid
- `src/components/common/scroll-reveal.tsx` - Scroll-based reveals

### Styles
- `src/app/styles/animations.css` - Animation utilities and optimizations

### Documentation
- `src/components/common/README.md` - Component usage notes
- `docs/performance-optimizations.md` - This document

