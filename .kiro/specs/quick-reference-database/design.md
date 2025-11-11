# Design Document

## Overview

The Quick Reference Database is a simplified, standalone medication database designed specifically for rapid dosage calculations in the quick reference interface. Unlike the comprehensive `src/lib/drug-categories` database with its complex dosing profiles and extensive metadata, this system focuses on essential information needed for immediate clinical decisions.

The design emphasizes simplicity, maintainability, and flexibility. It allows healthcare administrators to curate a focused set of medications with streamlined data structures, enabling quick calculations while maintaining the option to access detailed information from the main database when needed.

## Architecture

### Data Storage Architecture

```
src/lib/quick-reference-database/
├── index.ts                    # Main database export and utilities
├── medications.json            # Core medication data (JSON format for easy editing)
├── complaint-categories.json   # Complaint category definitions
├── types.ts                   # TypeScript interfaces for the simplified database
├── validation.ts              # Data validation utilities
└── calculations.ts            # Simplified calculation logic
```

### Component Integration

```
QuickDrugReferencePage
├── useQuickReferenceDatabase() # Custom hook for database access
├── DrugReferenceGrid
│   └── DrugDosageCard (uses simplified data)
└── ComplaintFilterBar (uses simplified categories)
```

### Data Flow

1. **Initialization**: Load simplified database from JSON files
2. **Filtering**: Apply complaint category and inclusion/exclusion filters
3. **Calculation**: Use simplified formulas for weight-based dosing
4. **Display**: Render cards with essential information
5. **Detail Access**: Link to main database for comprehensive information

## Components and Interfaces

### 1. Simplified Medication Data Structure

**Core Interface**:
```typescript
export interface QuickReferenceMedication {
  id: string
  name: string
  aliases?: string[]

  // Simplified dosing
  pediatricDose?: {
    formula: 'weight' | 'age' | 'fixed'
    amount: number
    unit: 'mg/kg' | 'mg/dose' | 'mcg/kg'
    frequency: string // 'BD', 'TDS', 'QID', 'OD'
    maxDose?: number
    minAge?: number // months
    maxAge?: number // months
  }

  adultDose?: {
    amount: number
    unit: 'mg' | 'g'
    frequency: string
    maxDose?: number
  }

  // Single concentration for volume calculation
  concentration: {
    amount: number
    unit: 'mg/ml' | 'mg/tablet' | 'mcg/ml'
    formulation: 'syrup' | 'tablet' | 'injection' | 'suspension'
  }

  // Categorization
  complaintCategories: string[]

  // Control
  enabled: boolean

  // Optional linking to main database
  mainDatabaseId?: string

  // Quick reference specific notes
  notes?: string[]
  warnings?: string[]
}
```

### 2. Complaint Categories Structure

**Interface**:
```typescript
export interface QuickReferenceComplaintCategory {
  id: string
  name: string
  displayName: string
  color: string
  enabled: boolean
  sortOrder: number
}
```

**Default Categories**:
```json
[
  {
    "id": "all",
    "name": "all",
    "displayName": "All Medications",
    "color": "gray",
    "enabled": true,
    "sortOrder": 0
  },
  {
    "id": "antibiotics",
    "name": "antibiotics",
    "displayName": "Antibiotics",
    "color": "red",
    "enabled": true,
    "sortOrder": 1
  },
  {
    "id": "pain-fever",
    "name": "pain-fever",
    "displayName": "Pain & Fever",
    "color": "orange",
    "enabled": true,
    "sortOrder": 2
  },
  {
    "id": "respiratory",
    "name": "respiratory",
    "displayName": "Respiratory",
    "color": "green",
    "enabled": true,
    "sortOrder": 3
  },
  {
    "id": "gastrointestinal",
    "name": "gastrointestinal",
    "displayName": "Gastrointestinal",
    "color": "blue",
    "enabled": true,
    "sortOrder": 4
  },
  {
    "id": "allergy",
    "name": "allergy",
    "displayName": "Allergy",
    "color": "pink",
    "enabled": true,
    "sortOrder": 5
  }
]
```

### 3. Database Management Hook

**Custom Hook Interface**:
```typescript
export interface UseQuickReferenceDatabaseReturn {
  medications: QuickReferenceMedication[]
  categories: QuickReferenceComplaintCategory[]
  isLoading: boolean
  error: string | null

  // Filtering
  getFilteredMedications: (categoryId?: string, audience?: AudienceMode) => QuickReferenceMedication[]
  getEnabledCategories: () => QuickReferenceComplaintCategory[]

  // Calculations
  calculateDose: (medicationId: string, weight: number, age?: number, audience?: AudienceMode) => QuickReferenceCalculationResult | null

  // Management (for admin interfaces)
  updateMedication: (medication: QuickReferenceMedication) => Promise<void>
  toggleMedicationEnabled: (medicationId: string) => Promise<void>
  addMedication: (medication: Omit<QuickReferenceMedication, 'id'>) => Promise<void>

  // Validation
  validateMedication: (medication: QuickReferenceMedication) => ValidationResult
}
```

### 4. Simplified Calculation Engine

**Calculation Result Interface**:
```typescript
export interface QuickReferenceCalculationResult {
  medicationId: string
  doseMg: number
  adminVolume: number | null
  adminUnit: string
  frequency: string
  formulation: string
  isValid: boolean
  warnings: string[]
  notes: string[]
}
```

**Calculation Logic**:
```typescript
export class QuickReferenceCalculator {
  static calculatePediatricDose(
    medication: QuickReferenceMedication,
    weight: number,
    ageMonths?: number
  ): QuickReferenceCalculationResult {
    // Simplified weight-based or age-based calculation
    // Single formula per medication
    // Basic validation and warnings
  }

  static calculateAdultDose(
    medication: QuickReferenceMedication
  ): QuickReferenceCalculationResult {
    // Fixed adult dosing
    // Volume calculation based on concentration
  }

  static calculateAdminVolume(
    doseMg: number,
    concentration: QuickReferenceMedication['concentration']
  ): number | null {
    // Simple volume calculation
    // Handle different formulation types
  }
}
```

## Data Models

### 1. Example Medication Entry

```json
{
  "id": "paracetamol-quick",
  "name": "Paracetamol",
  "aliases": ["Acetaminophen", "Tylenol"],
  "pediatricDose": {
    "formula": "weight",
    "amount": 15,
    "unit": "mg/kg",
    "frequency": "QID",
    "maxDose": 1000,
    "minAge": 1
  },
  "adultDose": {
    "amount": 1000,
    "unit": "mg",
    "frequency": "QID",
    "maxDose": 4000
  },
  "concentration": {
    "amount": 120,
    "unit": "mg/5ml",
    "formulation": "syrup"
  },
  "complaintCategories": ["pain-fever"],
  "enabled": true,
  "mainDatabaseId": "paracetamol",
  "notes": ["Most commonly used analgesic"],
  "warnings": ["Maximum 4g per day in adults"]
}
```

### 2. Database Configuration

```typescript
export interface QuickReferenceDatabaseConfig {
  version: string
  lastUpdated: string
  defaultAudience: AudienceMode
  defaultWeight: number
  enabledFeatures: {
    adminInterface: boolean
    dataValidation: boolean
    autoBackup: boolean
  }
}
```

## Error Handling

### Data Validation
- **Schema Validation**: JSON schema validation for medication entries
- **Calculation Validation**: Validate dosage calculations before display
- **Category Validation**: Ensure complaint categories exist and are enabled
- **Graceful Degradation**: Show available medications even if some have errors

### Runtime Error Handling
- **Missing Data**: Handle missing medication or category data gracefully
- **Calculation Errors**: Display "N/A" for invalid calculations with error tooltips
- **File Loading Errors**: Fallback to cached data or show appropriate error messages
- **Validation Errors**: Clear error messages for data entry issues

### User Feedback
- **Loading States**: Show loading indicators during data fetch
- **Error Messages**: User-friendly error messages for calculation issues
- **Validation Feedback**: Real-time validation feedback for data entry
- **Success Notifications**: Confirm successful data updates

## Testing Strategy

### Unit Tests
- **Calculation Engine**: Test simplified dosage calculations with various inputs
- **Data Validation**: Test JSON schema validation and data integrity checks
- **Filtering Logic**: Test medication filtering by categories and audience
- **Hook Functionality**: Test custom hook state management and data operations

### Integration Tests
- **Database Loading**: Test loading medications and categories from JSON files
- **Component Integration**: Test integration with existing quick reference components
- **Calculation Integration**: Test end-to-end calculation workflow
- **Error Scenarios**: Test error handling and recovery mechanisms

### Data Tests
- **Schema Compliance**: Validate all medication entries against schema
- **Calculation Accuracy**: Verify calculation results against known values
- **Category Consistency**: Ensure all referenced categories exist
- **Data Integrity**: Test for duplicate IDs and missing required fields

## Implementation Phases

### Phase 1: Core Database Structure
- Create JSON schema for medications and categories
- Implement TypeScript interfaces and validation
- Create basic data loading utilities
- Set up initial medication entries

### Phase 2: Calculation Engine
- Implement simplified calculation logic
- Create calculation result interfaces
- Add basic validation and error handling
- Test calculation accuracy

### Phase 3: Database Management
- Create custom hook for database access
- Implement filtering and search functionality
- Add medication management utilities
- Create validation and error handling

### Phase 4: Integration & Enhancement
- Integrate with existing quick reference components
- Add admin interface for medication management
- Implement backup and restore functionality
- Add performance optimizations

## Technical Considerations

### Performance Optimization
- **JSON Loading**: Lazy load medication data on demand
- **Calculation Caching**: Cache calculation results for repeated queries
- **Filtering Performance**: Optimize filtering for large medication lists
- **Memory Management**: Efficient data structures for quick access

### Data Management
- **Version Control**: Track database version for migration support
- **Backup Strategy**: Automatic backup of medication data changes
- **Data Migration**: Support for updating data structure versions
- **Conflict Resolution**: Handle concurrent data modifications

### Security Considerations
- **Data Validation**: Strict validation to prevent malicious data injection
- **Access Control**: Restrict medication management to authorized users
- **Audit Trail**: Log all medication data modifications
- **Data Integrity**: Checksums and validation for data files

### Maintainability
- **Documentation**: Clear documentation for data structure and management
- **Schema Evolution**: Support for adding new fields without breaking changes
- **Code Organization**: Modular structure for easy maintenance
- **Testing Coverage**: Comprehensive test coverage for all functionality
