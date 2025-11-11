# Mobile Typography System

## Overview

The mobile typography system provides optimized text rendering and readability for healthcare professionals using the Doses PWA on mobile devices. It implements mobile-first responsive design principles with enhanced accessibility features.

## Kures

### 1. Mobile-First Responsive Typography
- **Minimum font sizes**: Ensures critical medical information remains readable
- **Progressive enhancement**: Scales up for larger screens
- **Zoom support**: Maintains layout integrity up to 200% zoom
- **High contrast**: Enhanced contrast ratios for various lighting conditions

### 2. Medical Information Optimization
- **Medication names**: Enhanced readability with proper word breaking
- **Dosage calculations**: Maximum visibility for critical dosage information
- **Frequency text**: Clear but secondary prominence
- **Detail information**: Appropriate contrast for supporting information

### 3. Accessibility Features
- **Semantic structure**: Maintains proper heading hierarchy
- **Screen reader support**: Compatible with assistive technologies
- **Touch-friendly**: Optimized for touch interaction patterns
- **Reduced motion**: Respects user motion preferences

## Typography Components

### MobileText
General-purpose text component with mobile optimization.

```tsx
<MobileText variant="body">Regular body text</MobileText>
<MobileText variant="caption">Caption text</MobileText>
<MobileText variant="small">Small text</MobileText>
```

### MobileHeading
Responsive heading component with proper semantic structure.

```tsx
<MobileHeading level={1}>Main Title</MobileHeading>
<MobileHeading level={2}>Section Title</MobileHeading>
<MobileHeading level={3}>Subsection</MobileHeading>
```

### MedicationName
Specialized component for displaying medication names with enhanced readability.

```tsx
<MedicationName>Paracetamol 500mg tablets</MedicationName>
```

### DosageDisplay
High-visibility component for displaying dosage calculations.

```tsx
<DosageDisplay primary frequency="twice daily">500mg</DosageDisplay>
<DosageDisplay>250mg</DosageDisplay>
```

### DetailText
Component for secondary information with appropriate contrast.

```tsx
<DetailText>Single Dose:</DetailText>
<DetailText muted>Formulation:</DetailText>
```

### CriticalInfo
Wrapper for critical medical information requiring maximum visibility.

```tsx
<CriticalInfo>Important medical information</CriticalInfo>
```

## CSS Utility Classes

### Mobile-First Typography
- `.mobile-text-xs` - Extra small text with responsive scaling
- `.mobile-text-sm` - Small text with responsive scaling
- `.mobile-text-base` - Base text with responsive scaling
- `.mobile-text-lg` - Large text with responsive scaling
- `.mobile-text-xl` - Extra large text with responsive scaling
- `.mobile-text-2xl` - 2X large text with responsive scaling
- `.mobile-text-3xl` - 3X large text with responsive scaling

### Medical Information Classes
- `.medication-name` - Enhanced medication name styling
- `.dosage-primary` - Primary dosage display styling
- `.dosage-secondary` - Secondary dosage information styling
- `.medical-detail` - Medical detail information styling

### Accessibility Classes
- `.text-high-contrast` - High contrast text for critical information
- `.text-high-contrast-muted` - High contrast muted text
- `.zoom-safe` - Ensures content works well with zoom
- `.zoom-safe-flex` - Flex containers optimized for zoom

### Component-Specific Classes
- `.mobile-readable` - General mobile-optimized text
- `.mobile-heading` - Mobile-optimized heading styling
- `.mobile-subheading` - Mobile-optimized subheading styling
- `.critical-info` - Critical medical information styling
- `.medication-name-display` - Medication name display styling
- `.dosage-display` - Dosage display styling
- `.frequency-display` - Frequency display styling
- `.detail-text` - Detail text styling
- `.enhanced-contrast` - Enhanced contrast wrapper
- `.enhanced-contrast-muted` - Enhanced contrast muted text

## Implementation Guidelines

### 1. Font Size Requirements
- **Minimum 16px** for body text on mobile devices
- **Minimum 18px** for medication names and critical information
- **Minimum 24px** for primary dosage displays
- **Progressive scaling** for larger screens

### 2. Contrast Requirements
- **4.5:1 minimum** contrast ratio for normal text
- **7:1 preferred** contrast ratio for critical medical information
- **High contrast mode** support for accessibility
- **Dark mode** compatibility

### 3. Responsive Behavior
- **Mobile-first** approach with progressive enhancement
- **Breakpoint-aware** scaling using Tailwind CSS utilities
- **Orientation-aware** layout adaptations
- **Zoom-safe** implementation up to 200%

### 4. Word Breaking and Hyphenation
- **Automatic word breaking** for long medication names
- **Hyphenation support** for better text flow
- **Overflow handling** for constrained spaces
- **Text truncation** with proper ellipsis where appropriate

## Testing

### Unit Tests
- Component rendering with correct classes
- Accessibility compliance validation
- Responsive behavior verification
- Cross-browser compatibility

### Visual Tests
- Font size scaling across devices
- Contrast ratio validation
- Zoom behavior testing
- Layout integrity checks

### Integration Tests
- Real-world usage scenarios
- Medical information display accuracy
- User interaction patterns
- Performance impact assessment

## Browser Support

### Modern Mobile Browsers
- **iOS Safari 14+**
- **Chrome Mobile 90+**
- **Firefox Mobile 88+**
- **Samsung Internet 14+**

### Progressive Enhancement
- **Fallback fonts** for unsupported devices
- **Basic styling** for older browsers
- **Core functionality** maintained across all targets

## Performance Considerations

### Font Loading
- **System fonts** prioritized for performance
- **Web font fallbacks** with proper loading strategies
- **Font display optimization** to prevent layout shifts

### CSS Optimization
- **Utility-first approach** for minimal CSS bundle size
- **Critical CSS inlining** for above-the-fold content
- **Responsive image handling** for different screen densities

### Runtime Performance
- **Minimal JavaScript** for typography rendering
- **CSS-only animations** where possible
- **Efficient re-rendering** for dynamic content

## Maintenance

### Regular Testing
- **Cross-device testing** on real devices
- **Accessibility audits** using automated tools
- **User feedback integration** for continuous improvement
- **Performance monitoring** for regression detection

### Updates and Improvements
- **Typography trends** monitoring for healthcare applications
- **Accessibility standards** compliance updates
- **Browser support** expansion as needed
- **User experience** enhancements based on usage data
