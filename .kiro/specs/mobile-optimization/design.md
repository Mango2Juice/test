# Mobile Optimization Design Doc

## Overview

This design document outlines the mobile optimization strategy for the Doses PWA, focusing on enhancing the user experience for healthcare professionals using smartphones and tablets. The optimization will transform the existing desktop-oriented two-column layout into a mobile-first responsive design with improved touch interactions, navigation patterns, and component variants specifically designed for mobile devices.

## Architecture

### Current State Analysis

The application currently has:
- Basic responsive design using Tailwind CSS with `lg:grid-cols-2` for two-column layout
- Mobile breakpoint detection via `useIsMobile` hook (768px breakpoint)
- Bottom navigation bar with mobile-friendly design
- Basic mobile considerations with `pb-24` spacing for bottom nav

### Mobile-First Approach

The optimization will implement a mobile-first design strategy:
- **Primary Layout**: Single-column stacked layout for mobile devices
- **Secondary Layout**: Adaptive two-column layout for tablets in landscape
- **Navigation**: Swipe-based navigation between form and results
- **Component Variants**: Mobile-specific component implementations

## Components and Interfaces

### 1. Enhanced Layout System

#### Mobile Layout Container
```typescript
interface MobileLayoutProps {
  children: React.ReactNode
  orientation: 'portrait' | 'landscape'
  deviceType: 'mobile' | 'tablet'
}
```

**Key Features:**
- Orientation-aware layout switching
- Safe area handling for notched devices
- Optimized spacing and padding for mobile

#### Responsive Grid System
- **Mobile (< 768px)**: Single column, stacked layout
- **Tablet Portrait (768px - 1024px)**: Single column with larger spacing
- **Tablet Landscape (> 1024px)**: Adaptive two-column when beneficial

### 2. Mobile Navigation System

#### Swipe Navigation Component
```typescript
interface SwipeNavigationProps {
  views: Array<{
    id: string
    component: React.ComponentType
    title: string
  }>
  activeView: string
  onViewChange: (viewId: string) => void
  enableSwipe: boolean
}
```

**Implementation Details:**
- Touch gesture detection using `react-spring` for smooth animations
- Horizontal swipe between medication form and calculation results
- Visual indicators showing current view and available navigation
- Momentum-based scrolling with snap-to-view behavior

#### Enhanced Bottom Navigation
- Maintain existing bottom navigation structure
- Add visual indicators for active calculator sections
- Improve touch targets and spacing

### 3. Mobile-Optimized Form Components

#### Touch-Friendly Input Components
```typescript
interface MobileInputProps extends InputProps {
  touchTarget: 'standard' | 'large' | 'extra-large'
  keyboardType: 'numeric' | 'decimal' | 'default'
  hapticFeedback?: boolean
}
```

**Features:**
- Minimum 44px touch targets for all interactive elements
- Appropriate mobile keyboard types for different inputs
- Visual feedback for touch interactions
- Haptic feedback support where available

#### Mobile Select Components
- Replace dropdown menus with mobile-native selection patterns
- Bottom sheet selectors for medication and formulation selection
- Search-enabled selection with autocomplete
- Large touch targets with clear visual hierarchy

#### Mobile Number Input
- Custom numeric keypad for weight and age inputs
- Increment/decrement buttons with proper spacing
- Input validation with immediate visual feedback
- Support for decimal inputs with appropriate keyboards

### 4. Results Display Optimization

#### Mobile Results Layout
```typescript
interface MobileResultsProps {
  results: CalculationResult[]
  displayMode: 'compact' | 'detailed'
  allowExpansion: boolean
}
```

**Design Features:**
- Compact card-based layout for calculation results
- Expandable sections for detailed information
- Clear typography hierarchy optimized for mobile reading
- Proper contrast ratios for various lighting conditions

## Data Models

### Device Context Model
```typescript
interface DeviceContext {
  isMobile: boolean
  isTablet: boolean
  orientation: 'portrait' | 'landscape'
  screenSize: {
    width: number
    height: number
  }
  touchCapabilities: {
    supportsHaptics: boolean
    maxTouchPoints: number
  }
}
```

### Mobile Navigation State
```typescript
interface MobileNavigationState {
  currentView: 'form' | 'results'
  swipeEnabled: boolean
  transitionInProgress: boolean
  formState: FormData
  preserveState: boolean
}
```

### Touch Interaction Model
```typescript
interface TouchInteraction {
  gestureType: 'tap' | 'swipe' | 'pinch' | 'long-press'
  target: HTMLElement
  coordinates: { x: number; y: number }
  timestamp: number
}
```

## Error Handling

### Mobile-Specific Error Scenarios

1. **Orientation Change Errors**
   - Preserve form state during orientation changes
   - Handle layout recalculation failures
   - Graceful fallback to previous orientation if layout fails

2. **Touch Input Errors**
   - Validate touch targets meet accessibility requirements
   - Handle accidental touches with confirmation dialogs for critical actions
   - Provide clear error messages for invalid inputs

3. **Swipe Navigation Errors**
   - Fallback to button navigation if swipe gestures fail
   - Handle interrupted swipe gestures gracefully
   - Maintain state consistency during navigation failures

4. **Mobile Keyboard Issues**
   - Handle virtual keyboard appearance/disappearance
   - Adjust viewport when keyboard is active
   - Ensure form fields remain visible when keyboard is open

### Error Recovery Strategies

- **State Persistence**: Automatically save form state to prevent data loss
- **Progressive Enhancement**: Ensure core functionality works without advanced mobile features
- **Graceful Degradation**: Fall back to standard web interactions if mobile optimizations fail

## Testing Strategy

### Mobile Testing Approach

1. **Device Testing Matrix**
   - iOS devices: iPhone SE, iPhone 14, iPhone 14 Pro Max, iPad, iPad Pro
   - Android devices: Various screen sizes and Android versions
   - Different orientations and screen densities

2. **Responsive Testing**
   - Automated tests for breakpoint behavior
   - Visual regression testing for different screen sizes
   - Touch target size validation

3. **Gesture Testing**
   - Swipe navigation functionality across devices
   - Touch interaction accuracy and feedback
   - Orientation change handling

4. **Performance Testing**
   - Touch response times
   - Animation smoothness
   - Memory usage during extended mobile sessions

### Testing Tools and Frameworks

- **Unit Tests**: Vitest for component logic testing
- **Integration Tests**: Testing Library for user interaction testing
- **Visual Tests**: Chromatic or similar for visual regression
- **Device Testing**: BrowserStack or similar for real device testing
- **Performance**: Lighthouse mobile audits

### Accessibility Testing

- **Touch Target Compliance**: Ensure all interactive elements meet WCAG 2.1 AA standards (minimum 44px)
- **Screen Reader Support**: Test with mobile screen readers (VoiceOver, TalkBack)
- **High Contrast Mode**: Verify readability in high contrast and dark modes
- **Zoom Support**: Test functionality at 200% zoom level

## Implementation Phases

### Phase 1: Foundation
- Enhance device detection and context management
- Implement mobile-first responsive grid system
- Update existing components for better mobile touch targets

### Phase 2: Navigation
- Implement swipe navigation between form and results
- Add visual navigation indicators
- Enhance bottom navigation with better mobile patterns

### Phase 3: Component Optimization
- Create mobile-specific form components
- Implement bottom sheet selectors
- Add mobile-optimized number inputs

### Phase 4: Polish and Performance
- Add haptic feedback where supported
- Optimize animations and transitions
- Implement comprehensive mobile testing suite

## Technical Considerations

### Performance Optimization
- Lazy load mobile-specific components
- Optimize touch event handling to prevent performance issues
- Use CSS transforms for smooth animations
- Minimize layout thrashing during orientation changes

### Browser Compatibility
- Support for modern mobile browsers (iOS Safari 14+, Chrome Mobile 90+)
- Progressive enhancement for older browsers
- Fallback strategies for unsupported features

### PWA Integration
- Ensure mobile optimizations work well with PWA features
- Optimize for home screen installation
- Handle offline scenarios gracefully on mobile devices
