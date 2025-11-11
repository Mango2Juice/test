# Copilot Agent Instructions for Doses

## Repository Overview

**Doses** is a Progressive Web Application (PWA) for calculating medication dosages for pediatric and adult patients. It's designed to assist healthcare professionals with accurate, weight-based dosage calculations and includes a comprehensive drug glossary and various medical calculators.

### Key Statistics
- **Primary Language**: TypeScript (100%)
- **Framework**: Next.js 16.x with App Router
- **Size**: ~224 TypeScript source files
- **Node Version**: 22.x (specified in `.nvmrc`)
- **Package Manager**: npm (ALWAYS use npm, never yarn or pnpm)

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
**CRITICAL**: Prefer `npm ci` for clean, reproducible installs (especially in CI/CD). Use `npm install` only when adding/updating dependencies. This takes ~20-30 seconds. The repository uses `package-lock.json`, which must not be modified manually.

### Preflight Check (Recommended Before Committing)
```bash
npm run preflight
```
This runs the complete validation pipeline: `npm ci && npm run format && npm run lint && npm run build && npm run typecheck`. **This is the gold standard** - if it passes, your changes meet all quality gates.

**Build time**: ~5-7 minutes total
- `npm ci`: ~20-30 seconds
- `format`: ~1 second
```markdown
# Copilot Agent Instructions — Doses (concise)

Quick reference for AI contributors to be productive immediately in this repo.

- **Primary language**: TypeScript. **Framework**: Next.js 16 (App Router, Turbopack).
- **Node**: 20.x. **Package manager**: pnpm (this repo contains `pnpm-lock.yaml` and scripts use `pnpm`).

Core commands (use `pnpm`):
```powershell
pnpm install            # install deps
pnpm run dev            # dev server (port 9002)
pnpm run build          # production build
pnpm run format         # Biome formatting
pnpm run lint           # Biome lint autofix
pnpm run test           # run Vitest
pnpm run preflight      # local CI: install + format + lint + build + typecheck
```

Files & places to read first
- `src/lib/quick-reference-database/` — medication DB: `medications/` (one file per drug), `index.ts` (auto-aggregates), `calculations/` (dose engine), `types.ts` and `validation/` (zod schemas).
- `src/app/` — Next.js routes and server/client component split.
- `src/components/` — UI primitives (`ui/`), layout, calculators.
- `.kiro/steering/` — mandatory agent guidance (style/tech/structure/product/sentry). Read before code changes.

Project-specific conventions
- Use Biome for formatting/linting. Keep single quotes, 2-space indentation, ~120 char width.
- No `any`. Prefer `unknown` and explicit narrowing.
- Prefer plain objects + interfaces over classes. Avoid manual memoization in new code.
- Server components by default; mark interactive files with `'use client'`.

Medication authoring checklist (common task)
1. Copy `docs/medication-template.ts`.
2. Add file under `src/lib/quick-reference-database/medications/<category>/kebab-case-name.ts`.
3. Export `QuickReferenceMedication` typed object and validate with Zod.
4. Run `pnpm run typecheck` and `pnpm run test`.
Note: `medications/index.ts` is auto-discovered — do not edit it.

Testing & known quirks
- Tests use Vitest + jsdom. Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`).
- There are a few pre-existing failing tests (device detection, centor score, IBW, pregnancy). Do not fix unless required by your change.

Troubleshooting tips
- If you see multiple React copies runtime error: run `pnpm why react` and add a webpack alias in `next.config.ts` to force resolution to the repo `node_modules` copy.
- Sentry upload timeouts during build are expected in isolated environments — they don't fail builds.

Quick developer workflow
1. Read `.kiro/steering/*` and `AGENTS.md`.
2. Create a short todo list for changes (use the repo's agent tools).
3. Implement small changes, run `pnpm run typecheck` frequently.
4. Run `pnpm run format && pnpm run lint` before tests.
5. Use `pnpm run preflight` as the final local check.

What not to do
- Don't add Prettier/ESLint configs (Biome controls formatting/linting).
- Don't modify `medications/index.ts` (auto-generated).
- Avoid changing `package-lock.json`; this repo uses `pnpm-lock.yaml`.

If anything is unclear or you need the agent to expand an area (e.g., tracing the medication calculation flow end-to-end), tell me which part and I'll add short examples and links to the exact files.
```
- `next.config.ts`: Next.js config with PWA support and Sentry integration
