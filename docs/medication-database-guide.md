# Medication Database Guide

## Overview

The medication database has been refactored from a single monolithic file into individual medication files for betntainability, easier collaboration, and improved code organization.

## File Structure

### Flat Structure (Legacy)
```
src/lib/quick-reference-database/
├── medications/            # Individual medication files
│   ├── index.ts           # Auto-aggregation logic
│   ├── paracetamol.ts     # Individual medication
│   ├── ibuprofen.ts       # Individual medication
│   ├── amoxicillin.ts     # Individual medication
│   └── ...                # All other medications
├── types.ts               # Type definitions
└── index.ts               # Main export
```

### Category-Based Structure (Recommended)
```
src/lib/quick-reference-database/
├── medications/            # Medication files organized by category
│   ├── index.ts           # Auto-aggregation logic (supports subdirectories)
│   ├── analgesics/        # Pain and fever medications
│   │   ├── paracetamol.ts
│   │   └── ibuprofen.ts
│   ├── antibiotics/       # Antibiotic medications
│   │   ├── amoxicillin.ts
│   │   ├── augmentin.ts
│   │   └── azithromycin.ts
│   ├── antihistamines/    # Allergy medications
│   │   ├── cetirizine.ts
│   │   └── loratadine.ts
│   ├── respiratory/       # Respiratory medications
│   │   └── salbutamol.ts
│   ├── gastrointestinal/  # GI medications
│   │   └── domperidone.ts
│   ├── corticosteroids/   # Steroid medications
│   │   └── prednisolone.ts
│   └── [remaining-files]  # Uncategorized medications in root
├── types.ts               # Type definitions
└── index.ts               # Main export
```

## Adding New Medications

### 1. Choose Category (Recommended)

Organize medications into appropriate categories for better maintainability:

**Available Categories:**
- `analgesics/` - Pain and fever medications (paracetamol, ibuprofen)
- `antibiotics/` - Antibiotic medications (amoxicillin, azithromycin)
- `antihistamines/` - Allergy medications (cetirizine, loratadine)
- `respiratory/` - Respiratory medications (salbutamol, prednisolone)
- `gastrointestinal/` - GI medications (domperidone, ors)
- `corticosteroids/` - Steroid medications (prednisolone, dexamethasone)
- `antispasmodics/` - Antispasmodic medications (buscopan)

**Category Selection Guidelines:**
- Choose the primary therapeutic category
- If medication fits multiple categories, use the most specific one
- Place in root directory if no category fits well

### 2. File Naming Convention

- Use **kebab-case** for file names
- Use generic medication names rather than brand names when possible
- Pattern: `[category/][medication-name].ts`

**Examples:**
- `analgesics/paracetamol.ts` (not `tylenol.ts`)
- `antibiotics/amoxicillin-clavulanate.ts` (for Augmentin)
- `gastrointestinal/oral-rehydration-solution.ts` (for ORS)

### 3. File Structure Template

Each medication file must follow this exact structure:

**For Root Directory Files:**
```typescript
import type { QuickReferenceMedication } from '../types'
```

**For Category Subdirectory Files:**
```typescript
import type { QuickReferenceMedication } from '../../types'

/**
 * [Medication Name] ([Alternative Names])
 * [Brief description or primary use]
 * Aliases: [List of common brand names]
 * Categories: [Medical categories]
 */
const [variableName]: QuickReferenceMedication = {
  id: '[unique-medication-id]',
  name: '[Medication Name]',
  aliases: ['[Brand Name 1]', '[Brand Name 2]'],
  pediatricDose: {
    formula: 'weight', // or 'fixed'
    amount: [number],
    unit: '[mg/kg or mg/dose]',
    frequency: '[OD|BD|TDS|QID|PRN]',
    maxDose: [number],
    minAge: [months],
  },
  concentration: {
    amount: [number],
    unit: '[mg/ml or mg/5ml]',
    formulation: '[syrup|suspension|tablet|nebulizer]',
  },
  complaintCategories: ['[category1]', '[category2]'],
  enabled: true,
  mainDatabaseId: '[optional-main-db-id]',
  notes: ['[Clinical note 1]', '[Clinical note 2]'],
  warnings: ['[Warning 1]', '[Warning 2]'],
}

export default [variableName]
```

### 3. Variable Naming

- Use camelCase for the variable name
- Remove spaces and special characters
- Keep it descriptive but concise

**Examples:**
- `paracetamol` for Paracetamol
- `amoxicillinClavulanate` for Amoxicillin/Clavulanate
- `oralRehydrationSolution` for ORS

### 4. Required Fields

All medications must include:
- `id`: Unique identifier (kebab-case with `-quick` suffix)
- `name`: Official medication name
- `pediatricDose` or `ageRangeDoses`: Dosing information
- `concentration`: Available formulation details
- `complaintCategories`: Array of relevant medical categories
- `enabled`: Boolean (always `true` for active medications)

### 5. Optional Fields

- `aliases`: Array of brand names and alternative names
- `mainDatabaseId`: Reference to main medication database
- `notes`: Array of clinical notes and indications
- `warnings`: Array of safety warnings and contraindications

## Age Range Dosing

For medications with complex age-based dosing, use `ageRangeDoses` instead of `pediatricDose`:

```typescript
ageRangeDoses: [
  {
    minAge: 12, // 1 year (in months)
    maxAge: 23, // 1 year 11 months
    formula: 'weight',
    amount: 0.25,
    unit: 'mg/kg',
    frequency: 'BD',
    maxDose: 2.5,
  },
  {
    minAge: 24, // 2 years
    maxAge: 71, // 5 years 11 months
    formula: 'fixed',
    amount: 2.5,
    unit: 'mg/dose',
    frequency: 'BD',
    maxDose: 5,
  },
  // Additional age ranges...
],
```

## Complaint Categories

Use these standardized categories:
- `pain-fever`: Pain and fever management
- `antibiotics`: Antibiotic medications
- `respiratory`: Respiratory conditions
- `gastrointestinal`: GI conditions
- `allergy`: Allergy and antihistamines
- `antiviral`: Antiviral medications

## Frequency Codes

- `OD`: Once daily
- `BD`: Twice daily
- `TDS`: Three times daily
- `QID`: Four times daily
- `PRN`: As needed

NOTE: Allowed frequency literal values (case-sensitive): `OD`, `BD`, `TDS`, `QID`, `PRN`, `5x`.
These are validated at runtime by a `z.enum` in the medication validation schema. Medication files using any other values (including lowercase variants or synonyms) must be normalized before adding to the repository, otherwise they will be rejected during runtime validation.

## Example: Complete Medication File

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

## Validation

The system automatically validates each medication file:

1. **Structure Validation**: Ensures required fields are present
2. **Type Checking**: TypeScript validates data types
3. **Runtime Validation**: Invalid medications are excluded with warnings

Where calculations live

The dosing calculation logic has been extracted into reusable, pure helper modules. If you need to test or extend calculation behavior, look here:

- `src/lib/quick-reference-database/calculations/helpers.ts` — conversion and profile-based dose helpers (e.g., `computeDoseFromProfile`, `convertAmountToMg`).
- `src/lib/quick-reference-database/calculations/pediatric.ts` — pediatric dosing entrypoint used by the app.

## Creation Utilities

### Medication Creator Tool

Use the built-in utility to create new medication files with proper structure:

```typescript
import { createNewMedication, listAvailableCategories } from './medications/create-medication'

// List available categories
const categories = listAvailableCategories()
console.log('Available categories:', categories)

// Create a new medication in a category
const result = createNewMedication('Aspirin', 'analgesics')
console.log('Generated file:', result.filePath)
console.log('Content:', result.content)

// Create uncategorized medication
const uncategorized = createNewMedication('Custom Medicine')
```

### Template Generation

The utility provides:
- Proper import paths based on category
- Kebab-case file naming
- CamelCase variable naming
- Complete medication template structure
- Category-specific documentation

## Auto-Discovery

New medication files are automatically discovered and included:
- No manual registration required
- Files are imported using `import.meta.glob` with recursive subdirectory support
- Invalid files are logged as warnings but don't break the system
- Supports both flat structure and category-based organization

## Best Practices

1. **Use Generic Names**: Prefer generic medication names over brand names
2. **Include Aliases**: Add common brand names in the aliases array
3. **Comprehensive Notes**: Include relevant clinical information
4. **Safety Warnings**: Always include appropriate warnings and contraindications
5. **Accurate Dosing**: Verify all dosing information with medical references
6. **Consistent Formatting**: Follow the exact template structure

## Testing New Medications

After adding a new medication:

1. Run TypeScript check: `npm run typecheck`
2. Run tests: `npm run test`
3. Verify the medication appears in the application
4. Check console for any validation warnings

## Troubleshooting

### Common Issues

1. **File not discovered**: Ensure file is in the `medications/` directory with `.ts` extension
2. **Validation errors**: Check console for specific validation messages
3. **TypeScript errors**: Ensure all required fields are present and correctly typed
4. **Missing medication**: Verify the file exports a default object

### Validation Errors

The system will log warnings for:
- Missing required fields
- Invalid data types
- Malformed medication objects
- Files that don't export default objects

## Migration from Old System

The original monolithic `medications.ts` file has been:
- Backed up as `medications-backup.ts`
- Split into individual files
- Removed from the codebase

All existing functionality remains unchanged - the refactoring is purely structural.
