# Enhanced Input Components

This document describes the enhanced input components implemented as part of the modern visual design transformation.

## Overview

Three input components are available, each serving different use cases:

1. **Input** - Standard input with modern styling and state management
2. **FloatingInput** - Input with animated floating label
3. **MobileInput** - Enhanced mobile input with validation states and icons

## Features

All iomponents include:

- ✅ **Touch-friendly targets**: Minimum 44px height (48px for large/touch variants)
- ✅ **iOS zoom prevention**: 16px minimum font size
- ✅ **Modern styling**: New border radius using design tokens
- ✅ **Enhanced states**: Focus, hover, error, success, and disabled states
- ✅ **Mobile keyboard optimization**: Support for numeric, decimal, tel, email, url, and search keyboards
- ✅ **Smooth transitions**: 200ms animations for all state changes
- ✅ **Accessibility**: Proper ARIA attributes and keyboard navigation

## Input Component

The standard input component with modern styling.

### Usage

```tsx
import { Input } from '@/components/ui/input'

// Basic usage
<Input placeholder="Enter text" />

// With error state
<Input
  placeholder="Email"
  error="Invalid email address"
/>

// With success state
<Input
  placeholder="Username"
  success="Username is available"
/>

// Mobile keyboard optimization
<Input
  placeholder="Phone number"
  mobileKeyboard="tel"
/>

// Different sizes
<Input size="default" />  // 44px min height
<Input size="lg" />       // 48px min height
<Input size="touch" />    // 48px min height (mobile optimized)
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'default' \| 'sm' \| 'lg' \| 'touch'` | `'default'` | Input size variant |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Visual state |
| `error` | `string` | - | Error message to display |
| `success` | `string` | - | Success message to display |
| `mobileKeyboard` | `'numeric' \| 'decimal' \| 'tel' \| 'email' \| 'url' \| 'search'` | - | Mobile keyboard type |

## FloatingInput Component

Input with animated floating label that moves up when focused or filled.

### Usage

```tsx
import { FloatingInput } from '@/components/ui/floating-input'

// Basic usage
<FloatingInput label="Email Address" />

// With error
<FloatingInput
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// With success
<FloatingInput
  label="Username"
  success="Username is available"
/>

// Mobile keyboard
<FloatingInput
  label="Phone Number"
  mobileKeyboard="tel"
/>

// Controlled input
<FloatingInput
  label="Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  mobileKeyboard="decimal"
/>
```

### Props

All standard input props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text that floats on focus/fill |
| `error` | `string` | - | Error message to display |
| `success` | `string` | - | Success message to display |
| `mobileKeyboard` | `'numeric' \| 'decimal' \| 'tel' \| 'email' \| 'url' \| 'search'` | - | Mobile keyboard type |

### Animation Behavior

The label animates with the following properties:
- **Transform**: `translateY(-24px)` when floating
- **Scale**: `0.875` (87.5%) when floating
- **Duration**: `200ms`
- **Timing**: `ease-out`
- **Color**: Changes to primary color on focus

## MobileInput Component

Enhanced mobile input with validation states and icons.

### Usage

```tsx
import { MobileInput } from '@/components/ui/mobile-input'

// With validation state
<MobileInput
  validationState="valid"
  showValidationIcon
  value={email}
  onChange={setEmail}
/>

// With validation states
<MobileInput validationState="invalid" />
<MobileInput validationState="validating" />
<MobileInput validationState="warning" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validationState` | `'default' \| 'valid' \| 'invalid' \| 'warning' \| 'validating'` | `'default'` | Validation state |
| `showValidationIcon` | `boolean` | `false` | Show validation icon |
| `scrollIntoViewOnFocus` | `boolean` | `true` | Scroll into view when focused |
| `mobileKeyboard` | `'numeric' \| 'decimal' \| 'tel' \| 'email' \| 'url' \| 'search'` | - | Mobile keyboard type |

## Design Tokens

The components use the following design tokens:

### Colors
- `--color-input`: Border color
- `--color-primary`: Focus border and ring color
- `--color-primary-300`: Hover border color
- `--color-error`: Error state color
- `--color-success`: Success state color
- `--color-muted-foreground`: Placeholder and label color

### Border Radius
- `--radius-input`: `0.5rem` (8px)

### Spacing
- Padding: `1rem` (16px) horizontal
- Height: `2.75rem` (44px) minimum for default
- Height: `3rem` (48px) minimum for large/touch

### Transitions
- Duration: `200ms`
- Timing: `ease-out`

## Accessibility

All components follow WCAG 2.2 guidelines:

- ✅ Minimum touch target size: 44x44px
- ✅ Minimum font size: 16px (prevents iOS zoom)
- ✅ Proper focus indicators: 2px ring with primary color
- ✅ Color contrast: Meets WCAG AA standards
- ✅ Keyboard navigation: Full keyboard support
- ✅ Screen reader support: Proper ARIA labels and descriptions

## Requirements Mapping

This implementation satisfies the following requirements:

- **Requirement 2.2**: Minimum 16px font size for medication names and critical text
- **Requirement 2.5**: Minimum contrast ratio of 4.5:1 for all text
- **Requirement 4.2**: Minimum 48x48px touch targets per WCAG 2.2
- **Requirement 6.1**: Subtle scale animation and color change on tap
- **Requirement 6.2**: Subtle elevation change or color shift on hover
- **Requirement 6.4**: Animated label and border on focus
- **Requirement 9.3**: Smooth transitions with ease-out timing
- **Requirement 12.5**: 2px focus ring with primary color

## Browser Support

- Chrome/Edge (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Mobile Safari (iOS 15+)
- Chrome Mobile (Android 10+)

## Performance

- GPU-accelerated animations using `transform` and `opacity`
- Minimal repaints and reflows
- Optimized for 60fps on all devices
- No layout shifts during animations

