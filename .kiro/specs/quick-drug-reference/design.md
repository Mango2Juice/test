# Design Document

## Overview

The Quick Drug Reference feature replaces the existing Categories and Adult pages to become the new application homepage. This transforms the current navigation-heavy interface into a streamlined, single-page reference tool that serves as the main entry point. Healthcare professionals will immediately access pre-calculated dosage medications in a card-based layout, with real-time updates based on patient weight input and filtering capabilities by complaint categories.

The design leverages the existing calculation engine and drug database while completely restructuring the application architecture to prioritize immediate drug access over category navigation. This eliminates the need for separate category pages and consolidates all drug information into one comprehensive homepage.

## Architecture

### Component Hierarchy

```
HomePage (QuickDrugReferencePage)
├── AppHeader
│   └── NavigationMenu (Calculator, Diagnosis, Resources)
├── WeightInputSection
├── ComplaintFilterBar
├── DrugReferenceGrid
│   └── DrugDosageCard[]
├── DrugDetailModal (optional)
└── AppFooter
```

### Data Flow

1. **Initialization**: Load all drugs and filter by audience (pediatric/adult)
2. **Weight Input**: Real-time calculation updates for all displayed drugs
3. **Filtering**: Client-side filtering by complaint tags
4. **Calculation**: Reuse existing calculation utilities for each drug
5. **Display**: Present results in card format with color coding

### State Management

Extend the existing Zustand calculator store with new state for:
- `quickReferenceMode: boolean`
- `displayWeight: number`
- `selectedComplaintFilter: string | null`
- `visibleDrugs: Drug[]`
- `drugCalculationResults: Map<string, CalculationOutput>`

## Components and Interfaces

### 1. QuickDrugReferencePage Component

**Purpose**: Main container component that orchestrates the quick reference interface

**Props**:
```typescript
interface QuickDrugReferencePageProps {
  audience: AudienceMode
  defaultWeight?: number
  initialComplaintFilter?: string
}
```

**Responsibilities**:
- Initialize the quick reference store
- Manage overall layout and responsive behavior
- Handle navigation between quick reference and detailed views

### 2. WeightInputSection Component

**Purpose**: Provides weight input with real-time calculation updates

**Props**:
```typescript
interface WeightInputSectionProps {
  weight: number
  onWeightChange: (weight: number) => void
  audience: AudienceMode
}
```

**Features**:
- Large, prominent weight input field
- Unit display (kg)
- Default weight suggestions based on audience
- Real-time validation and formatting

### 3. ComplaintFilterBar Component

**Purpose**: Horizontal filter buttons for complaint categories

**Props**:
```typescript
interface ComplaintFilterBarProps {
  availableComplaints: ComplaintCategory[]
  selectedComplaint: string | null
  onComplaintChange: (complaint: string | null) => void
}
```

**Design**:
- Horizontal scrollable button group
- Color-coded buttons matching drug categories
- "All" option to show all drugs
- Active state styling

### 4. DrugReferenceGrid Component

**Purpose**: Responsive grid layout for drug cards

**Props**:
```typescript
interface DrugReferenceGridProps {
  drugs: Drug[]
  calculationResults: Map<string, CalculationOutput>
  onDrugSelect?: (drugId: string) => void
}
```

**Layout**:
- Responsive grid (1-2 columns on mobile, 2-4 on desktop)
- Masonry-style layout for varying card heights
- Smooth animations for filtering transitions

### 5. DrugDosageCard Component

**Purpose**: Individual drug information card with calculated dosage

**Props**:
```typescript
interface DrugDosageCardProps {
  drug: Drug
  calculationResult: CalculationOutput | null
  complaintCategory: ComplaintCategory
  onClick?: () => void
}
```

**Design Elements**:
- Drug name prominently displayed
- Dosage calculation with units
- Color-coded badge for medication type
- Administration volume and frequency
- Warning indicators for edge cases

## Data Models

### ComplaintCategory Extension

Extend the existing drug data structure to include complaint tags:

```typescript
export interface ComplaintCategory {
  id: string
  name: string
  displayName: string
  color: string // For UI theming
  icon?: string // Optional icon identifier
}

export const COMPLAINT_CATEGORIES: ComplaintCategory[] = [
  { id: 'all', name: 'all', displayName: 'All', color: 'gray' },
  { id: 'antibiotics', name: 'infection', displayName: 'Antibiotics', color: 'red' },
  { id: 'symptomatic', name: 'symptomatic', displayName: 'Symptomatic', color: 'blue' },
  { id: 'pain', name: 'pain', displayName: 'Pain & Fever', color: 'orange' },
  { id: 'respiratory', name: 'respiratory', displayName: 'Respiratory', color: 'green' },
  { id: 'gastrointestinal', name: 'gastrointestinal', displayName: 'GI', color: 'purple' },
  { id: 'allergy', name: 'allergy', displayName: 'Allergy', color: 'pink' }
]
```

### Drug Data Enhancement

Add complaint tags to existing Drug interface:

```typescript
export interface Drug {
  // ... existing properties
  complaintTags: string[] // Array of complaint category IDs
  commonIndications: string[] // Most frequently used indications for quick reference
  quickReferenceNotes?: string[] // Specific notes for quick reference display
}
```

### Quick Reference Calculation Result

Simplified calculation output optimized for card display:

```typescript
export interface QuickReferenceCalculation {
  drugId: string
  doseMg: number
  adminVolumeMl: number | null
  frequencyText: string
  formulationText: string
  hasWarnings: boolean
  warningCount: number
  isCalculationValid: boolean
}
```

## Error Handling

### Calculation Errors
- Display "N/A" for invalid calculations
- Show warning icon for drugs with calculation issues
- Provide tooltip with error details

### Data Loading Errors
- Graceful fallback to available drugs
- Loading states for initial data fetch
- Retry mechanisms for failed calculations

### Input Validation
- Real-time weight validation with visual feedback
- Minimum/maximum weight constraints
- Clear error messages for invalid inputs

## Testing Strategy

### Unit Tests
- **Calculation Engine**: Test dosage calculations for various weight inputs
- **Filtering Logic**: Verify complaint-based filtering accuracy
- **Data Transformation**: Test conversion from detailed to quick reference format
- **Component Rendering**: Test individual component rendering with various props

### Integration Tests
- **End-to-End Workflow**: Weight input → filtering → calculation → display
- **Real-time Updates**: Verify calculations update when weight changes
- **Filter Interactions**: Test switching between complaint categories
- **Responsive Behavior**: Test layout on different screen sizes

### Performance Tests
- **Calculation Performance**: Measure time for bulk calculations
- **Rendering Performance**: Test with large numbers of drugs
- **Memory Usage**: Monitor memory consumption during real-time updates
- **Mobile Performance**: Specific testing on mobile devices

## Implementation Phases

### Phase 1: Core Infrastructure
- Extend drug data with complaint tags
- Create quick reference store
- Implement basic calculation engine integration

### Phase 2: UI Components
- Build WeightInputSection component
- Create ComplaintFilterBar component
- Develop DrugDosageCard component

### Phase 3: Integration & Polish
- Implement DrugReferenceGrid with responsive layout
- Add real-time calculation updates
- Implement filtering and search functionality

### Phase 4: Enhancement & Optimization
- Add detailed drug modal
- Implement performance optimizations
- Add accessibility features
- Mobile-specific optimizations

## Technical Considerations

### Performance Optimization
- **Memoization**: Use React.memo for drug cards to prevent unnecessary re-renders
- **Virtual Scrolling**: Implement for large drug lists
- **Debounced Calculations**: Debounce weight input to reduce calculation frequency
- **Lazy Loading**: Load drug details on demand

### Accessibility
- **Keyboard Navigation**: Full keyboard support for filters and cards
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast**: Ensure color coding works with high contrast modes
- **Touch Targets**: Minimum 44px touch targets for mobile

### Mobile Considerations
- **Touch-Friendly Interface**: Large touch targets and appropriate spacing
- **Swipe Gestures**: Consider swipe navigation for filters
- **Offline Support**: Cache calculations for offline use
- **Performance**: Optimize for slower mobile processors

### Browser Compatibility
- **Modern Browsers**: Target ES2020+ features
- **Progressive Enhancement**: Graceful degradation for older browsers
- **CSS Grid Support**: Fallback layouts for unsupported browsers
