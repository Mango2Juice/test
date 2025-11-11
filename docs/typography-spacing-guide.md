# Typography and Spacing System Guide

This guide explains how to use the typography and spacing tokensin the design system.

## Typography System

### Font Sizes (Responsive)

The typography system uses a mobile-first approach with responsive scaling:

- **Mobile (Base: 16px)**: Default font sizes
- **Tablet (768px+, Base: 17px)**: Slightly larger for better readability
- **Desktop (1024px+, Base: 18px)**: Optimized for larger screens

#### Available Font Size Tokens

```css
--text-xs: 0.75rem      /* 12px mobile */
--text-sm: 0.875rem     /* 14px mobile */
--text-base: 1rem       /* 16px mobile, 17px tablet, 18px desktop */
--text-lg: 1.125rem     /* 18px mobile */
--text-xl: 1.25rem      /* 20px mobile */
--text-2xl: 1.5rem      /* 24px mobile */
--text-3xl: 1.875rem    /* 30px mobile */
--text-4xl: 2.25rem     /* 36px mobile */
--text-5xl: 3rem        /* 48px mobile */
```

#### Usage in Tailwind

```tsx
<h1 className="text-4xl">Large Heading</h1>
<p className="text-base">Body text</p>
<span className="text-sm">Small text</span>
```

### Font Weights

```css
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800
```

#### Usage

```tsx
<h2 className="font-bold">Bold Heading</h2>
<p className="font-normal">Normal text</p>
<span className="font-medium">Medium weight</span>
```

### Line Heights

```css
--leading-none: 1
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

#### Usage

```tsx
<p className="leading-normal">Standard paragraph</p>
<h1 className="leading-tight">Tight heading</h1>
```

### Letter Spacing

```css
--tracking-tighter: -0.05em
--tracking-tight: -0.025em
--tracking-normal: 0
--tracking-wide: 0.025em
--tracking-wider: 0.05em
--tracking-widest: 0.1em
```

#### Usage

```tsx
<h1 className="tracking-tight">Heading with tight tracking</h1>
<p className="tracking-normal">Normal tracking</p>
```

### Typography Utility Classes

Pre-defined typography styles for common use cases:

```tsx
// Headings
<h1 className="text-heading-1">Heading 1</h1>
<h2 className="text-heading-2">Heading 2</h2>
<h3 className="text-heading-3">Heading 3</h3>
<h4 className="text-heading-4">Heading 4</h4>
<h5 className="text-heading-5">Heading 5</h5>
<h6 className="text-heading-6">Heading 6</h6>

// Body text
<p className="text-body-large">Large body text</p>
<p className="text-body">Standard body text</p>
<p className="text-body-small">Small body text</p>
<span className="text-caption">Caption text</span>
```

### Medical-Specific Typography

```tsx
// Medication name
<span className="medication-name-display">Paracetamol</span>

// Dosage result
<div className="dosage-display">500mg</div>

// Frequency
<span className="frequency-display">Every 6 hours</span>

// Detail text
<p className="detail-text">Additional information</p>
```

## Spacing System

### Base Spacing Scale (4px base unit)

```css
--space-0: 0
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-3: 0.75rem    /* 12px */
--space-4: 1rem       /* 16px */
--space-5: 1.25rem    /* 20px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
--space-24: 6rem      /* 96px */
```

#### Usage in Tailwind

```tsx
<div className="p-4">Padding 16px</div>
<div className="m-6">Margin 24px</div>
<div className="gap-8">Gap 32px</div>
```

### Semantic Spacing

Pre-defined spacing for common layout patterns:

```css
--spacing-section: var(--space-12)      /* 48px - Between major sections */
--spacing-component: var(--space-6)     /* 24px - Between components */
--spacing-element: var(--space-4)       /* 16px - Between related elements */
--spacing-inline: var(--space-2)        /* 8px - Inline spacing */
```

#### Semantic Spacing Utility Classes

```tsx
// Margin utilities
<section className="spacing-section">Major section</section>
<div className="spacing-component">Component spacing</div>
<div className="spacing-element">Element spacing</div>
<span className="spacing-inline">Inline spacing</span>

// Gap utilities (for flex/grid)
<div className="flex gap-section">Large gap</div>
<div className="flex gap-component">Component gap</div>
<div className="flex gap-element">Element gap</div>
<div className="flex gap-inline">Inline gap</div>

// Padding utilities
<div className="padding-section">Section padding</div>
<div className="padding-component">Component padding</div>
<div className="padding-element">Element padding</div>
<div className="padding-inline">Inline padding</div>
```

### Safe Area Insets

For mobile devices with notches and rounded corners:

```css
--spacing-safe-top: env(safe-area-inset-top)
--spacing-safe-bottom: env(safe-area-inset-bottom)
--spacing-safe-left: env(safe-area-inset-left)
--spacing-safe-right: env(safe-area-inset-right)
```

#### Usage

```tsx
<div className="mobile-safe-area">Respects left/right safe areas</div>
<div className="mobile-safe-area-top">Respects top safe area</div>
<div className="mobile-safe-area-bottom">Respects bottom safe area</div>
<div className="mobile-safe-area-full">Respects all safe areas</div>
```

## Best Practices

### Typography

1. **Use semantic heading levels**: Always use h1-h6 in proper hierarchy
2. **Minimum font size**: Never go below 16px for body text on mobile (prevents iOS zoom)
3. **Line height**: Use 1.5 or higher for body text for better readability
4. **Letter spacing**: Use tight tracking for headings, normal for body text

### Spacing

1. **Consistent spacing**: Use the spacing scale consistently throughout the app
2. **Related elements**: Use `--spacing-element` (16px) between related items
3. **Sections**: Use `--spacing-section` (48px) between major sections
4. **Touch targets**: Ensure minimum 48x48px for interactive elements

### Responsive Design

1. **Mobile-first**: Start with mobile typography and spacing
2. **Scale up**: Let the responsive typography scale automatically on larger screens
3. **Test across breakpoints**: Verify typography looks good at all breakpoints

## Examples

### Card Component with Typography and Spacing

```tsx
<div className="padding-component gap-element flex flex-col">
  <h3 className="text-heading-3">Card Title</h3>
  <p className="text-body spacing-element">
    This is the card content with proper spacing.
  </p>
  <div className="flex gap-inline">
    <button className="text-sm font-medium">Action 1</button>
    <button className="text-sm font-medium">Action 2</button>
  </div>
</div>
```

### Form with Semantic Spacing

```tsx
<form className="flex flex-col gap-component">
  <div className="flex flex-col gap-element">
    <label className="text-sm font-medium">Patient Weight</label>
    <input className="text-base" type="number" />
  </div>

  <div className="flex flex-col gap-element">
    <label className="text-sm font-medium">Medication</label>
    <select className="text-base">
      <option>Select medication</option>
    </select>
  </div>

  <button className="text-base font-medium">Calculate Dose</button>
</form>
```

### Medical Information Display

```tsx
<div className="flex flex-col gap-component">
  <div className="spacing-element">
    <span className="medication-name-display">Paracetamol</span>
  </div>

  <div className="spacing-element">
    <div className="dosage-display">500mg</div>
    <div className="frequency-display">Every 6 hours</div>
  </div>

  <div className="detail-text">
    Maximum daily dose: 4000mg
  </div>
</div>
```

