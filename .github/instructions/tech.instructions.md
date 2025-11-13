# Technology Stack & Build System

## Core Technologies

- **Framework**: Next.js 15+ with App Router (hybrid SSR/CSR approach)
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS utility-first framework
- **UI Components**: shadcn/ui built on Radix UI primitives
- **State Management**: Zustand for client-side state
- **Testing**: Vitest with jsdom environment
- **Code Quality**: Biome for linting, formatting, and static analysis

## Key Libraries

- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Mono
- **PWA**: next-pwa for offline capabilities
- **Monitoring**: Sentry for error tracking
- **Theme**: next-themes for dark/light mode

## Development Commands

```bash
# Development
npm run dev              # Start dev server on port 9002 with Turbopack

# Code Quality
npm run typecheck        # TypeScript type checking
npm run lint             # Biome linting
npm run format           # Format code with Biome
npm run check            # Run all Biome checks

# Testing
npm run test             # Run unit tests
npm run test:watch       # Watch mode testing
npm run test:coverage    # Generate coverage report
npm run e2e              # Run Playwright e2e tests
npm rune2e:debug        # Debug e2e tests
npm run e2e:ui           # E2e tests with UI

# Build & Deploy
npm run build            # Production build
npm run start            # Start production server
```

## Code Style Configuration

- **Line Width**: 120 characters
- **Quotes**: Single quotes for JS/TS, single quotes for JSX
- **Semicolons**: As needed (ASI-safe)
- **Indentation**: 2 spaces (space indentation, not tabs)
- **Biome Rules**: All recommended rules enabled with domain-specific rules for Next.js, React, and testing

## Architecture Patterns

- **Server Components by default**: Use 'use client' only when necessary
- **Pure functions**: Especially for dose calculations
- **Immutable state**: Never mutate state directly
- **Feature-based organization**: Group related components, stores, and utilities
- **Type-first development**: Define types before implementation

## Project Configuration Notes

- **TypeScript**: Extremely strict configuration with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and `useUnknownInCatchVariables`
- **Path aliases**: `@/*` mapping to root directory
- **Biome**: Space indentation (2 spaces), single quotes, semicolons as needed, all recommended rules enabled
- **Vitest**: Coverage collection enabled for all TypeScript/JavaScript files
- Avoid implicit `any` and `unknown` types. Use explicit types when possible
- Use `readonly` for properties that are not modified after initialization
- Use explicit comparison instead of implicit boolean coercion.

