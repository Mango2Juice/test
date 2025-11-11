# Elevation System Documentation

## Overview

The eletem provides a consistent way to create visual depth and hierarchy in the application using shadows and z-index values. This system is crucial for establishing the visual layering of UI components and ensuring proper stacking context.

## Elevation Levels

The system defines 7 elevation levels (0-6), each with specific use cases and visual characteristics:

### Level 0: Base
- **Shadow**: None
- **Z-Index**: 0
- **Use Case**: Elements that sit directly on the background with no elevation
- **Examples**: Page backgrounds, flat surfaces
- **CSS Class**: `elevation-0`

```css
/* No shadow, on background */
box-shadow: none;
z-index: 0;
```

### Level 1: Raised
- **Shadow**: `shadow-xs` (0 1px 2px 0 rgb(0 0 0 / 0.05))
- **Z-Index**: 1
- **Use Case**: Subtle lift for elements that need minimal separation from background
- **Examples**: Input fields at rest, subtle containers
- **CSS Class**: `elevation-1`

```css
/* Subtle lift */
box-shadow: var(--shadow-xs);
z-index: 1;
```

### Level 2: Card
- **Shadow**: `shadow-sm` (0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1))
- **Z-Index**: 2
- **Use Case**: Standard cards and containers
- **Examples**: Medication cards, information panels, list items
- **CSS Class**: `elevation-2`

```css
/* Standard cards */
box-shadow: var(--shadow-sm);
z-index: 2;
```

### Level 3: Hover
- **Shadow**: `shadow-md` (0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))
- **Z-Index**: 3
- **Use Case**: Interactive elements in hover state
- **Examples**: Cards on hover, buttons on hover, interactive tiles
- **CSS Class**: `elevation-3`

```css
/* Interactive hover state */
box-shadow: var(--shadow-md);
z-index: 3;
```

### Level 4: Modal
- **Shadow**: `shadow-lg` (0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1))
- **Z-Index**: 40
- **Use Case**: Overlays and modal dialogs
- **Examples**: Modal dialogs, bottom sheets, side panels
- **CSS Class**: `elevation-4`

```css
/* Overlays and modals */
box-shadow: var(--shadow-lg);
z-index: 40;
```

### Level 5: Popover
- **Shadow**: `shadow-xl` (0 25px 50px -12px rgb(0 0 0 / 0.25))
- **Z-Index**: 50
- **Use Case**: Dropdowns and popovers that appear above modals
- **Examples**: Dropdown menus, select options, context menus
- **CSS Class**: `elevation-5`

```css
/* Dropdowns and popovers */
box-shadow: var(--shadow-xl);
z-index: 50;
```

### Level 6: Tooltip
- **Shadow**: `shadow-2xl` (0 35px 60px -15px rgb(0 0 0 / 0.3))
- **Z-Index**: 60
- **Use Case**: Highest elevation for tooltips and notifications
- **Examples**: Tooltips, toast notifications, alerts
- **CSS Class**: `elevation-6`

```css
/* Highest elevation */
box-shadow: var(--shadow-2xl);
z-index: 60;
```

## Shadow Tokens

### Light Theme Shadows
```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-2xl: 0 35px 60px -15px rgb(0 0 0 / 0.3);
```

### Dark Theme Shadows (More Pronounced)
```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
--shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
--shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
--shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4);
--shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.5);
--shadow-2xl: 0 35px 60px -15px rgb(0 0 0 / 0.6);
```

### Colored Shadow for Primary Actions
```css
--shadow-primary: 0 10px 15px -3px rgb(48 199 181 / 0.2), 0 4px 6px -4px rgb(48 199 181 / 0.2);
```

## Border Radius System

### Base Radius Tokens
```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px */
--radius-base: 0.5rem;   /* 8px */
--radius-md: 0.75rem;    /* 12px */
--radius-lg: 1rem;       /* 16px */
--radius-xl: 1.5rem;     /* 24px */
--radius-2xl: 2rem;      /* 32px */
--radius-full: 9999px;   /* Fully rounded */
```

### Component-Specific Radius Mapping
```css
--radius-button: var(--radius-md);   /* 12px */
--radius-card: var(--radius-lg);     /* 16px */
--radius-input: var(--radius-base);  /* 8px */
--radius-modal: var(--radius-xl);    /* 24px */
--radius-badge: var(--radius-full);  /* Fully rounded */
```

## Usage Examples

### Basic Elevation
```tsx
// Card with standard elevation
<div className="elevation-2 rounded-card p-4">
  <h3>Medication Card</h3>
  <p>Details here...</p>
</div>

// Card with hover elevation
<div className="elevation-2 hover:elevation-3 rounded-card p-4 transition-shadow duration-200">
  <h3>Interactive Card</h3>
</div>
```

### Modal with Proper Elevation
```tsx
<div className="elevation-4 rounded-modal p-6 bg-card">
  <h2>Confirm Action</h2>
  <p>Are you sure?</p>
  <div className="flex gap-2">
    <button className="elevation-2 hover:elevation-3 rounded-button">
      Cancel
    </button>
    <button className="elevation-2 hover:shadow-primary rounded-button">
      Confirm
    </button>
  </div>
</div>
```

### Dropdown Menu
```tsx
<div className="elevation-5 rounded-lg p-2 bg-popover">
  <button className="hover:elevation-2 rounded-base">Option 1</button>
  <button className="hover:elevation-2 rounded-base">Option 2</button>
  <button className="hover:elevation-2 rounded-base">Option 3</button>
</div>
```

### Using Shadow Utilities Directly
```tsx
// Apply specific shadow
<div className="shadow-md rounded-lg">Content</div>

// Primary action with colored shadow
<button className="shadow-primary rounded-button">
  Primary Action
</button>

// Transition between shadows
<div className="shadow-sm hover:shadow-lg transition-shadow duration-200">
  Hover me
</div>
```

### Using Radius Utilities
```tsx
// Component-specific radius
<button className="rounded-button">Button</button>
<div className="rounded-card">Card</div>
<input className="rounded-input" />
<div className="rounded-modal">Modal</div>
<span className="rounded-badge">Badge</span>

// Generic radius
<div className="rounded-lg">Large radius</div>
<div className="rounded-full">Fully rounded</div>
```

## Best Practices

### 1. Consistent Elevation Hierarchy
- Always maintain proper elevation hierarchy
- Higher elevation elements should appear above lower elevation elements
- Don't skip elevation levels unnecessarily

### 2. Hover States
- Use elevation-3 for hover states on interactive elements
- Combine with smooth transitions for better UX
```tsx
className="elevation-2 hover:elevation-3 transition-shadow duration-200"
```

### 3. Primary Actions
- Use `shadow-primary` for important call-to-action buttons
- This creates a subtle colored glow that draws attention

### 4. Dark Mode Considerations
- Shadows are automatically more pronounced in dark mode
- Test elevation in both light and dark themes
- The system handles theme switching automatically

### 5. Performance
- Shadows are GPU-accelerated
- Use `will-change: box-shadow` sparingly for elements that will animate
- Prefer CSS transitions over JavaScript animations

### 6. Accessibility
- Elevation should enhance, not replace, other visual cues
- Ensure sufficient color contrast regardless of shadow
- Don't rely solely on shadows for interactive state indication

### 7. Component-Specific Radius
- Use semantic radius tokens (rounded-button, rounded-card, etc.) for consistency
- This makes it easier to update component styles globally

## Transition Examples

### Smooth Shadow Transitions
```tsx
// Basic transition
<div className="shadow-sm hover:shadow-md transition-shadow duration-200">
  Hover for elevation
</div>

// With transform for lift effect
<div className="shadow-smer:shadow-md hover:-translate-y-1 transition-all duration-200">
  Lift on hover
</div>

// Primary action with colored shadow
<button className="shadow-sm hover:shadow-primary transition-shadow duration-200">
  Primary Button
</button>
```

### Elevation State Changes
```tsx
// Card that elevates on interaction
<div className={cn(
  "rounded-card p-4 transition-all duration-200",
  isActive ? "elevation-3" : "elevation-2"
)}>
  Content
</div>
```

## Z-Index Management

The elevation system includes z-index values to ensure proper stacking:

- **0-3**: Content layers (base, raised, cards, hover states)
- **40**: Modals and overlays
- **50**: Dropdowns and popovers
- **60**: Tooltips and notifications

This prevents z-index conflicts and maintains a predictable stacking order.

## Reduced Motion Support

The system respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .elevation-* {
    transition-duration: 0.01ms !important;
  }
}
```

## Browser Support

- All modern browsers support box-shadow
- Fallback: Elements without shadows still maintain proper layout
- Progressive enhancement: Shadows enhance but aren't required for functionality

## Related Documentation

- [Color System](./color-system.md)
- [Typography System](./typography-system.md)
- [Spacing System](./spacing-system.md)
- [Animation System](./animation-system.md)

