# Design Document

## Overview

The medication database refactoring transforms the current monolithic `medications.ts` file into afile-per-medication structure. This design improves maintainability by isolating each medication's data, enables easier collaboration through reduced merge conflicts, and provides a scalable foundation for growing the medication database.

The solution maintains complete backward compatibility while introducing a clean, organized file structure that automatically aggregates individual medication files into the existing export format.

## Architecture

### Current Structure
```
src/lib/quick-reference-database/
├── medications.ts          # 900+ lines, all medications
├── types.ts
└── index.ts
```

### New Structure
```
src/lib/quick-reference-database/
├── medications/            # Individual medication files
│   ├── index.ts           # Auto-aggregation logic
│   ├── paracetamol.ts     # Individual medication
│   ├── ibuprofen.ts       # Individual medication
│   ├── amoxicillin.ts     # Individual medication
│   └── ...                # All other medications
├── types.ts               # Unchanged
└── index.ts               # Unchanged
```

### Optional Organized Structure (Future Enhancement)
```
src/lib/quick-reference-database/
├── medications/
│   ├── index.ts           # Auto-aggregation logic
│   ├── analgesics/        # Category-based grouping
│   │   ├── paracetamol.ts
│   │   └── ibuprofen.ts
│   ├── antibiotics/
│   │   ├── amoxicillin.ts
│   │   ├── azithromycin.ts
│   │   └── augmentin.ts
│   ├── respiratory/
│   │   ├── salbutamol.ts
│   │   └── prednisolone.ts
│   └── ...
├── types.ts
└── index.ts
```

## Components and Interfaces

### 1. Individual Medication File Structure

Each medication file follows a consistent pattern:

**File: `medications/paracetamol.ts`**
```typescript
import type { QuickReferenceMedication } from '../types'

/**
 * Paracetamol (Acetaminophen) - Most commonly used pediatric analgesic
 * Aliases: Acetaminophen, Tylenol
 * Categories: Pain & Fever
 */
const paracetamol: QuickReferenceMedication = {
  id: 'paracetamol-quick',
  name: 'Paracetamol',
  aliases: ['Acetaminophen', 'Tylenol'],
  pediatricDose: {
    formula: 'weight',
    amount: 15,
    unit: 'mg/kg',
    frequency: 'QID',
    maxDose: 1000,
    minAge: 1,
  },
  concentration: {
    amount: 250,
    unit: 'mg/5ml',
    formulation: 'syrup',
  },
  complaintCategories: ['pain-fever'],
  enabled: true,
  mainDatabaseId: 'paracetamol',
  notes: ['Most commonly used pediatric analgesic'],
  warnings: ['Maximum dose based on weight', 'Do not exceed 4 doses per day'],
}

export default paracetamol
```

### 2. Auto-Aggregation Index System

**File: `medications/index.ts`**
```typescript
import type { QuickReferenceMedication } from '../types'

// Auto-import all medication files
const medicationModules = import.meta.glob('./*.ts', { eager: true })

/**
 * Automatically aggregated medications from individual files
 * Each medication file should export a default QuickReferenceMedication object
 */
export const medications: QuickReferenceMedication[] = []

// Process each medication module
for (const [path, module] of Object.entries(medicationModules)) {
  // Skip the index file itself
  if (path === './index.ts') continue

  const medicationModule = module as { default: QuickReferenceMedication }

  if (medicationModule.default && typeof medicationModule.default === 'object') {
    // Validate the medication object has required properties
    if (validateMedicationStructure(medicationModule.default)) {
      medications.push(medicationModule.default)
    } else {
      console.warn(`Invalid medication structure in file: ${path}`)
    }
  } else {
    console.warn(`Medication file ${path} does not export a default object`)
  }
}

/**
 * Validates that a medication object has the required structure
 */
function validateMedicationStructure(medication: any): medication is QuickReferenceMedication {
  return (
    medication &&
    typeof medication.id === 'string' &&
    typeof medication.name === 'string' &&
    typeof medication.enabled === 'boolean' &&
    Array.isArray(medication.complaintCategories) &&
    medication.concentration &&
    typeof medication.concentration.amount === 'number'
  )
}

/**
 * Default export for compatibility with existing imports
 */
export default {
  medications,
}
```

### 3. Enhanced Index with Subdirectory Support

For future category-based organization:

```typescript
import type { QuickReferenceMedication } from '../types'

// Auto-import all medication files recursively
const medicationModules = import.meta.glob('./**/*.ts', { eager: true })

export const medications: QuickReferenceMedication[] = []

for (const [path, module] of Object.entries(medicationModules)) {
  // Skip index files
  if (path.endsWith('/index.ts') || path === './index.ts') continue

  const medicationModule = module as { default: QuickReferenceMedication }

  if (medicationModule.default && validateMedicationStructure(medicationModule.default)) {
    medications.push(medicationModule.default)
  } else {
    console.warn(`Invalid or missing medication in file: ${path}`)
  }
}

// Sort medications by name for consistent ordering
medications.sort((a, b) => a.name.localeCompare(b.name))
```

### 4. Migration Utilities

**File: `medications/migration-helper.ts`** (Temporary utility for refactoring)
```typescript
import type { QuickReferenceMedication } from '../types'
import { medications as originalMedications } from '../medications-original'

/**
 * Utility to generate individual medication files from the original array
 * This is a one-time migration helper
 */
export function generateMedicationFiles(): Record<string, string> {
  const files: Record<string, string> = {}

  for (const medication of originalMedications) {
    const fileName = generateFileName(medication.name)
    const fileContent = generateFileContent(medication)
    files[`${fileName}.ts`] = fileContent
  }

  return files
}

function generateFileName(medicationName: string): string {
  return medicationName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function generateFileContent(medication: QuickReferenceMedication): string {
  return `import type { QuickReferenceMedication } from '../types'

/**
 * ${medication.name}${medication.aliases ? ` (${medication.aliases.join(', ')})` : ''}
 * ${medication.notes ? medication.notes.join(' | ') : ''}
 */
const ${generateVariableName(medication.name)}: QuickReferenceMedication = ${JSON.stringify(medication, null, 2)}

export default ${generateVariableName(medication.name)}
`
}

function generateVariableName(medicationName: string): string {
  return medicationName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}
```

## Data Models

### 1. File Naming Convention

**Pattern**: `[medication-name].ts`

**Examples**:
- `paracetamol.ts`
- `ibuprofen.ts`
- `amoxicillin-clavulanate.ts` (for Augmentin)
- `oral-rehydration-solution.ts` (for ORS)

**Rules**:
- Use kebab-case (lowercase with hyphens)
- Remove special characters and spaces
- Use generic names rather than brand names when possible
- Keep names descriptive but concise

### 2. File Content Structure

Each medication file must:
1. Import the `QuickReferenceMedication` type
2. Include a descriptive comment with medication info
3. Define a const variable with the medication data
4. Export the medication as default

### 3. Directory Organization Options

**Option 1: Flat Structure** (Initial implementation)
```
medications/
├── index.ts
├── paracetamol.ts
├── ibuprofen.ts
├── amoxicillin.ts
└── ...
```

**Option 2: Category-Based Structure** (Future enhancement)
```
medications/
├── index.ts
├── analgesics/
├── antibiotics/
├── respiratory/
├── gastrointestinal/
└── allergy/
```

## Error Handling

### 1. File Loading Errors

**Missing Files**:
- Graceful handling of missing medication files
- Warning logs for files that cannot be loaded
- Continue loading other valid medications

**Invalid Exports**:
- Validate that each file exports a default object
- Check that the exported object matches QuickReferenceMedication interface
- Provide clear error messages with file paths

### 2. Validation Errors

**Structure Validation**:
```typescript
interface ValidationResult {
  isValid: boolean
  errors: string[]
  filePath: string
}

function validateMedication(medication: any, filePath: string): ValidationResult {
  const errors: string[] = []

  if (!medication.id) errors.push('Missing required field: id')
  if (!medication.name) errors.push('Missing required field: name')
  if (typeof medication.enabled !== 'boolean') errors.push('Invalid field: enabled must be boolean')
  // ... additional validations

  return {
    isValid: errors.length === 0,
    errors,
    filePath
  }
}
```

### 3. Development-Time Validation

**TypeScript Integration**:
- Leverage TypeScript compiler for compile-time validation
- Use strict type checking to catch interface violations
- Provide clear error messages for type mismatches

**Runtime Validation**:
- Validate medication structure during import
- Log warnings for invalid medications
- Exclude invalid medications from the final array

## Testing Strategy

### 1. Migration Testing

**Data Integrity Tests**:
- Verify all medications from original file are present in new structure
- Confirm no data loss during migration
- Validate that medication IDs remain unique

**Backward Compatibility Tests**:
- Ensure existing imports continue to work
- Verify that the medications array has the same content
- Test that consuming components receive identical data

### 2. File Structure Tests

**Auto-Discovery Tests**:
- Test that new medication files are automatically included
- Verify that invalid files are properly excluded
- Test subdirectory discovery functionality

**Validation Tests**:
- Test medication structure validation
- Verify error handling for invalid files
- Test warning generation for malformed data

### 3. Performance Tests

**Loading Performance**:
- Measure import time for individual files vs. monolithic file
- Test performance with large numbers of medication files
- Verify that build-time aggregation doesn't impact runtime performance

## Implementation Phases

### Phase 1: Setup and Migration
1. Create the new `medications/` directory structure
2. Implement the auto-aggregation index system
3. Create migration utilities to split the existing file
4. Generate individual medication files from current data

### Phase 2: Validation and Testing
1. Implement medication structure validation
2. Add comprehensive error handling
3. Create tests for the new structure
4. Verify backward compatibility

### Phase 3: Integration and Cleanup
1. Update imports to use the new structure
2. Remove the original monolithic file
3. Update documentation and development guidelines
4. Add tooling for creating new medication files

### Phase 4: Enhancement (Optional)
1. Implement category-based subdirectory organization
2. Add development tools for medication management
3. Create templates for new medication files
4. Add automated validation in CI/CD pipeline

## Technical Considerations

### 1. Build Performance

**Vite/Webpack Optimization**:
- Use `import.meta.glob` for efficient file discovery
- Leverage tree-shaking to exclude unused medications
- Consider lazy loading for large medication sets

**Bundle Size Impact**:
- Individual files may slightly increase bundle size due to module overhead
- Offset by better tree-shaking and dead code elimination
- Monitor bundle size during implementation

### 2. Development Experience

**IDE Support**:
- Better IntelliSense and navigation with individual files
- Easier debugging and error location
- Improved search and replace operations

**Git Workflow**:
- Reduced merge conflicts with individual files
- Cleaner commit history for medication changes
- Easier code review for medication updates

### 3. Maintainability

**Code Organization**:
- Clear separation of concerns with one medication per file
- Easier to locate and modify specific medications
- Scalable structure for growing medication database

**Documentation**:
- Self-documenting file structure
- Inline documentation for each medication
- Clear patterns for adding new medications

## Migration Strategy

### 1. Preparation Phase
- Backup current medications.ts file
- Create comprehensive tests for existing functionality
- Set up the new directory structure

### 2. Implementation Phase
- Generate individual medication files using migration utility
- Implement auto-aggregation index
- Update imports and verify functionality

### 3. Validation Phase
- Run all existing tests to ensure no regressions
- Perform manual testing of medication functionality
- Validate data integrity and completeness

### 4. Cleanup Phase
- Remove original medications.ts file
- Update documentation and development guides
- Clean up temporary migration utilities
