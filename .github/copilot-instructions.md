# Copilot Agent Instructions for Doses

## Repository Overview

**Doses** is a Progressive Web Application (PWA) for calculating medication dosages for pediatric and adult patients. It's designed to assist healthcare professionals with accurate, weight-based dosage calculations and includes a comprehensive drug glossary and various medical calculators.

### Key Statistics
- **Primary Language**: TypeScript (100%)
- **Framework**: Next.js 16.x with App Router
- **Size**: ~224 TypeScript source files
- **Node Version**: 20.x (specified in `.nvmrc`)
- **Package Manager**: pnpm (ALWAYS use pnpm, never yarn or npm)

### Technology Stack
- **Next.js**: React framework with App Router for hybrid server/client rendering
- **TypeScript**: Strict type checking enabled throughout
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui + Radix UI**: Accessible, customizable UI components
- **Zustand**: Lightweight state management
- **Vitest**: Unit and integration testing framework
- **Biome**: Code formatting and linting (replaces ESLint/Prettier)

---

## Critical Build & Test Commands

### Installation
```bash
npm ci
```
**CRITICAL**: Prefer `pnpm install --frozen-lockfile` for clean, reproducible installs (especially in CI/CD). Use `pnpm install` only when adding/updating dependencies. This takes ~20-30 seconds. The repository uses `pnpm-lock.yaml`, which must not be modified manually.

### Preflight Check (Recommended Before Committing)
```bash
pnpm preflight
```
This runs the complete validation pipeline: `pnpm install --frozen-lockfile && pnpm run format && pnpm run lint && pnpm run build && pnpm run typecheck`. **This is the gold standard** - if it passes, your changes meet all quality gates.

**Build time**: ~5-7 minutes total
- `pnpm install --frozen-lockfile`: ~20-30 seconds
- `format`: ~1 second
- `lint`: ~2 seconds
- `build`: ~4-5 minutes (Next.js production build)
- `typecheck`: ~5-10 seconds

### Individual Commands

#### Formatting & Linting (Biome)
```bash
pnpm format      # Auto-fix formatting issues
pnpm lint        # Auto-fix linting issues
pnpm check       # Run both format + lint together
pnpm ci          # Check-only mode (no fixes, for CI)
```
- Uses Biome.js (configured in `biome.json`)
- 120 character line width
- Single quotes, semicolons only when needed
- Runs in ~1-3 seconds
- **Scope**: Only checks `src/**` (excludes node_modules, .next, public, .kiro, .vscode)

#### Type Checking
```bash
pnpm run typecheck
```
- Runs TypeScript compiler with `--noEmit`
- Takes ~5-10 seconds
- Very strict settings enabled (see tsconfig.json)

#### Testing
```bash
pnpm test              # Run all tests once
pnpm test:watch        # Watch mode for development
pnpm test:coverage     # Generate coverage report
```
- Uses Vitest with jsdom environment
- **Test setup file**: `src/test/setup.ts` must exist and import `@testing-library/jest-dom` (already created in this repository)
- **Pre-existing failures**: 5 tests fail in the current codebase (device detection, centor score, IBW, pregnancy calculator). These are NOT your responsibility to fix unless directly related to your changes.
- Tests run in ~5-6 seconds
- Test files use `.test.ts` or `.test.tsx` suffix, co-located with source files

#### Building
```bash
pnpm build         # Production build
pnpm dev           # Development server (port 9002)
pnpm start         # Run production build locally
```
- **Production build time**: ~4-5 minutes with Turbopack
- **Build artifacts**: Output to `.next/` directory (already in .gitignore, do not commit)
- **Known build warnings**: Sentry CLI timeout errors are expected in isolated environments (no network access to sentry.io). These do NOT fail the build.
- **Development server**: Runs on port 9002 (not default 3000)

---

## Project Structure

### Root Configuration Files
- `package.json`: Dependencies and npm scripts
- `tsconfig.json`: Strict TypeScript configuration
- `biome.json`: Biome linting and formatting rules
- `vitest.config.ts`: Test configuration with jsdom setup
- `vitest.mobile.config.ts`: Mobile-specific test configuration
- `next.config.ts`: Next.js config with PWA support and Sentry integration
- `.nvmrc`: Node 20 version lock

### Key Directories

#### `src/app/` - Next.js App Router Pages
- `/` - Quick Drug Reference homepage (main entry point)
- `/calculator/*` - Medical calculators (centor-score, framingham-risk-score, ideal-body-weight, neonate-weight-loss, phq-9-score, pregnancy, stop-bang, dass-score)
- `/calculators` - Calculator directory page
- `/drug/[drugId]` - Dynamic drug detail pages

#### `src/components/` - React Components
- `ui/` - shadcn/ui base components (Button, Card, Input, etc.)
- `common/` - App-wide components (LoadingSpinner, ErrorMessage)
- `layout/` - Layout components (AppLayout, BottomNavBar)
- `quick-reference/` - Homepage-specific components
- `calculator/` - Calculator-specific components
- `glossary/` - Drug glossary components

#### `src/lib/` - Core Logic & Data
- `quick-reference-database/` - **Modular medication database**
  - `medications/` - Individual medication files (one per drug)
  - `index.ts` - Auto-aggregates all medications
  - `types.ts` - TypeScript definitions
  - `validation/` - Data validation schemas
  - `calculations/` - Dose calculation engine
- `stores/` - Zustand state stores (app-store, calculator-store)
- `utils/` - Utility functions and calculator logic
- `types/` - Shared TypeScript types
- `search/` - Search functionality

#### `src/hooks/` - Custom React Hooks
- Co-located with components or in dedicated `__tests__/` subdirectories

#### `docs/` - Documentation
- `development.md` - Setup instructions
- `testing.md` - Testing guidelines
- `architecture.md` - System architecture
- `clean-code.md`, `typescript.md`, `react.md` - Coding standards
- `medication-database-guide.md` - Adding medications guide

#### `.kiro/steering/` - AI Agent Guidelines
**CRITICAL**: Read ALL files in `.kiro/steering/` before making changes:
- `style.md` - Biome code style rules
- `tech.md` - Technical conventions
- `structure.md` - File organization
- `product.md` - Product requirements
- `sentry.md` - Error monitoring setup

---

## Core Architecture & Data Flow

### Medication Database Engine
The heart of Doses is its modular medication database system:

- **Data Source**: Individual medication files in `src/lib/quick-reference-database/medications/[category]/`
- **Auto-Discovery**: Files are automatically imported via `medications/index.ts` - supports nested categories
- **Type Safety**: All medications must conform to `QuickReferenceMedication` interface
- **Calculation Engine**: `calculations/` directory handles dose computations with formulas like `weight`, `age`, `fixed`, `weight-tiered`
- **Runtime Validation**: Zod schemas validate medication data structure and dosing parameters

### State Management Strategy
- **Zustand Stores**: Minimal, persistent client state
  - `app-store.ts`: Global app settings (audience mode: pediatric/adult)
  - `calculator-store.ts`: Medical calculator state
- **URL State**: Search params for shareable calculator states
- **Local Storage**: Persistent user preferences via Zustand persist middleware
- **No Global Cache**: Medication data is imported statically at build time

### Component Architecture Patterns
- **Server Components**: Default for static content and data fetching
- **Client Components**: Only for interactivity (`'use client'` directive)
- **Suspense Boundaries**: Used for loading states (see `HomePage`)
- **Error Boundaries**: Global error handling via `global-error.tsx`
- **Compound Components**: UI components follow radix-ui patterns with composition

### PWA & Performance
 **Node Version**: 22.x (specified in `.nvmrc`)
 **Package Manager**: pnpm (ALWAYS use pnpm, never npm or yarn)
- **Code Splitting**: Automatic route-based splitting via App Router
- **Image Optimization**: Next.js built-in optimization for medical illustrations

pnpm install --frozen-lockfile

## Development Workflow

pnpm run preflight
1. **Read steering docs**: Check `.kiro/steering/*.md` for relevant guidelines
2. **Install dependencies**: `npm ci` (if starting fresh)
3. **Check existing state**: Run `npm run typecheck && npm run check` to ensure baseline passes

### Making Changes
1. **Write code** following TypeScript/React guidelines (see `AGENTS.md`)
2. **Add tests** if touching critical logic (calculations, validations)
pnpm run format      # Auto-fix formatting issues
pnpm run lint        # Auto-fix linting issues
pnpm run check       # Run both format + lint together
pnpm run ci          # Check-only mode (no fixes, for CI)
2. **Run tests**: `pnpm test` (skip if only docs changed)
3. **Type check**: `pnpm typecheck`
4. **Build**: `pnpm build` (critical validation)

---

pnpm run test              # Run all tests once
pnpm run test:watch        # Watch mode for development
pnpm run test:coverage     # Generate coverage report
**Symptom**: `Error: Cannot find module 'src/test/setup.ts'`

**Solution**: The file `src/test/setup.ts` should exist with:
pnpm run build         # Production build
pnpm run dev           # Development server (port 9002)
pnpm run start         # Run production build locally
This has been added to the repository.


**Expected**: These are timeout warnings when building without network access to sentry.io. They do NOT fail the build. The build completes successfully.

### Issue: Pre-existing Test Failures
**Known Failures** (as of current state):
- `use-mobile.test.ts` - Device detection test
- `centor-score.test.ts` - Risk calculation
- `ideal-body-weight.test.ts` - Robinson formula precision
- `pregnancy-calculator.test.ts` - Date calculations (2 tests)

**Action**: Do NOT fix these unless directly related to your task. They are pre-existing issues.

### Issue: Build Takes Too Long
**Typical time**: 4-5 minutes for production build

**Don't**: Try to cancel or optimize. This is expected for Next.js with Turbopack.

**Do**: Use `pnpm dev` for faster iteration during development.

### Issue: Medication Not Appearing
**Symptom**: New medication file created but not showing in app

**Debug Steps**:
1. Check file exports `QuickReferenceMedication` interface
2. Verify file is in correct category directory
3. Run `pnpm typecheck` to catch schema errors
4. Check `medications/index.ts` auto-discovery (should not need manual editing)
5. Restart dev server (`pnpm dev`)

### Issue: Calculation Errors
**Symptom**: Incorrect dosage calculations

**Debug Approach**:
1. Check `DosingProfile` configuration in medication file
2. Test calculation logic in `src/lib/quick-reference-database/calculations/`
3. Verify units match between `amount` and `unit` fields
4. Check `maxDose` and `minAge`/`maxAge` constraints
5. Use browser dev tools to inspect calculation inputs/outputs

---

## Key Coding Conventions

### TypeScript Rules (from `AGENTS.md`)
- **NO** `any` types - use `unknown` and type narrowing
- **NO** classes - use plain objects with interfaces
- **NO** type assertions unless absolutely necessary
- **YES** to exhaustive switch statements with `checkExhaustive` helper
- **YES** to ES module encapsulation (export/unexported)

### React Rules (from `AGENTS.md`)
- **Functional components only** - no class components
- **Hooks at top level** - follow Rules of Hooks
- **Pure render functions** - no side effects in component body
- **Avoid useEffect** - only for synchronization with external systems
- **NO** manual memoization (useMemo, useCallback, React.memo) in new code - React Compiler handles optimization. Note: Some existing code may use these patterns; follow existing patterns when modifying those areas.
- **Immutable state updates** - never mutate state directly

### Biome Style (from `.kiro/steering/style.md`)
- Single quotes
- 2 spaces indentation
- 120 character line width
- Semicolons only when needed (ASI-safe)
- Organized imports (auto-sort enabled)

### Testing Conventions (from `AGENTS.md`)
- Use Vitest (`describe`, `it`, `expect`, `vi`)
- Co-locate tests with source files (`.test.ts`, `.test.tsx`)
- Mock with `vi.mock()` - place at top of file for critical deps
- Use `beforeEach/afterEach` for setup/teardown
- Test behavior, not implementation

---

## Adding Medications

### File Location
```
src/lib/quick-reference-database/medications/
├── index.ts              # Auto-aggregation (DO NOT EDIT)
├── analgesics/           # Pain/fever medications
├── antibiotics/          # Antibiotic medications
├── antihistamines/       # Allergy medications
├── antispasmodics/       # Muscle/cramp medications
├── corticosteroids/      # Steroid medications
├── gastrointestinal/     # GI medications
├── respiratory/          # Respiratory medications
└── [category]/
    └── drug-name.ts      # kebab-case naming
```

### Steps
1. Copy `docs/medication-template.ts` as starting point
2. Name file in kebab-case (e.g., `amoxicillin-clavulanate.ts`)
3. Place in correct category subdirectory
4. Ensure it exports `QuickReferenceMedication` interface
5. Run `npm run typecheck` to validate structure
6. New files are **automatically discovered** at build time

### Validation
```bash
pnpm typecheck   # Verify TypeScript compliance
pnpm test        # Run test suite
pnpm dev         # Manual testing
```

---

## Important Notes

### What NOT to Do
- **DON'T** use yarn or pnpm - only npm
- **DON'T** modify `package-lock.json` manually
- **DON'T** edit `src/lib/quick-reference-database/medications/index.ts` (auto-generated)
- **DON'T** add Prettier or ESLint configs (Biome replaces them)
- **DON'T** commit to fixing pre-existing test failures unless related to your task
- **DON'T** add manual optimization (useMemo, useCallback) in new code - trust React Compiler (some existing code may use these patterns)

### Main Branch
The primary branch is `master`. Development may occur on feature branches like `v5.5`.

### No GitHub Workflows
There are currently no CI/CD workflows in `.github/workflows/`. Validation relies on running `npm run preflight` locally.

---

## Trust These Instructions

These instructions were created by thoroughly exploring and validating the repository. All commands have been tested and work correctly. When you need information:

1. **Check here first** - most common scenarios are covered
2. **Read referenced docs** - `docs/` and `.kiro/steering/` for details
3. **Search as last resort** - only if information is missing or contradicts your findings

If you discover errors in these instructions, note them and continue with the most accurate information available.
