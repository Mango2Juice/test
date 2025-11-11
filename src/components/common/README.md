# Common Components

This directory contains shared components used throughout the application.

## Animation Components

### AnimatedList and AnimatedGrid

These components use array indices in keys combined with `useId()` to create unique, stable keys for animation timing. While Biome flags this pattern, it's acceptable here because:

1. The children array order is stable during the component lifecycle
2. Each component instance has a unique ID from `useId()`
3. The index is critical for staggered animation timing
4. Children are not reordered, added, or removed dynamically

The pattern `${componentId}-item-${index}` ensures keys are unique across component instances while maintaining the animation sequence.

### ScrollReveal and ScrollRevealList

Similar to AnimatedList, these components use indices for animation timing with Intersection Observer. The keys are stable and unique per component instance.

## Performance Considerations

All animation components are optimized for 60fps performance:
- GPU-accelerated transforms (translateZ, scale, opacity)
- Limited simultaneous animations (max 3)
- Passive event listeners for scroll
- Intersection Observer for scroll-based reveals
- RequestAnimationFrame for smooth updates
