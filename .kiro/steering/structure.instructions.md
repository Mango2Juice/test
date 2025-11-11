# Project Structure & Organization

## Root Directory Structure

```
├── src/                    # Main source code
├── public/                 # Static assets (icons, images, PWA files)
├── docs/                   # Project documentation
├── .kiro/                  # Kiro AI assistant configuration
├── .next/            # Next.js build output (generated)
├── node_modules/           # Dependencies (generated)
└── Configuration files     # Package.json, configs, etc.
```

## Source Code Organization (`src/`)

### App Router Structure (`src/app/`)
- **Pages**: Following Next.js App Router conventions
  - `/` - Drug category browser (homepage)
  - `/calculator` - Dose calculator interface
  - `/diagnosis` - Clinical diagnosis guide
  - `/resources` - Medical resources and equations
- **Layouts**: Application-wide and route-specific layouts
- **API Routes**: Server-side API endpoints (if any)

### Component Architecture (`src/components/`)
```
components/
├── ui/        # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── common/                 # Shared application components
│   ├── loading-spinner.tsx
│   └── custom-icons.tsx
├── layout/                 # Layout-specificcomponents
│   ├── app-layout.tsx
│   └── bottom-nav-bar.tsx
└── medication-form/        # Feature-specific components
    └── ...
```

### Feature Organization (`src/features/`)
- **calculator/**: Dose calculator feature
  - `components/` - Calculator-specific UI components
  - `store/` - Zustand state management
  - `utils/` - Calculation utilities and pure functions

### Shared Libraries(`src/lib/`)
```
lib/
├── drug-categories/  # Medication data organized by category
│   ├── index.ts           # Main drug data aggregation
│   └── [category].ts      # Individual category files
├── diagnoses.ts           # Clinical diagnosis guide data
├── formulations.ts        # Available medication formulations
├── stores/                # Zustand store definitions
├── utils/                 # General utility functions
│   ├── cn.ts             # Class name utilities
│   └── calculation-utils.ts # Core dose calculation logic
└── validation/            # Zod schemas and validation logic
```

### Custom Hooks (`src/hooks/`)
- `useIsMobile.ts` - Responsive design hook
- `useQuickAccessDrugs.ts` - Frequently used drugs management

## Key Organizational Principles

1.**Feature-Based Grouping**: Related components, stores, and utilities are co-located
2. **Separation of Concerns**: UI components separate from business logic
3. **Pure Functions**: Calculation logic isolated in utility functions
4. **Data Co-location**: Medication and diagnosis data centralized in `lib/`
5. **Lazy Loading**: Large datasets dynamically imported when needed
6. **Type Safety**: TypeScript definitions co-located with implementations

## File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `dose-calculator.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `calculation-utils.ts`)
- **Types**: `PascalCase` interfaces/types within files
- **Constants**: `UPPER_SNAKE_CASE` for module-level constants

## TypeScript Configuration

- **Extremely strict mode** enabled with additional safety checks
- Path aliases: `@/*` maps to root directory
- Type definitions in `types/` directory and `.d.ts` files
- Avoid `any` types for better type safety
- Forbidden non-null assertion

## Import/Export Patterns

- Use barrel exports (`index.ts`) for clean imports
- Prefer named exports over default exports
- Use `import type` for type-only imports
- Dynamic imports for large data setsand code splitting

## Development Workflow

- **Biome**: Handles formatting and linting with space indentation (2 spaces)
- **Vitest**: Testing with coverage collection enabled
- **TypeScript**: Strict type checking with comprehensive error detection
- **Next.js**: App Router with Turbopack for fast development
