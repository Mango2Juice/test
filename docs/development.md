# Development Instructions

This document describes how to set up and run the **Doses** application in a local development environment. Following these steps ensures consistency across contributors.

---

## 1. Prerequisites

Before starting, make sure you have the following installed:

* **Node.js** – Latest **LTS version** is recommended.

  > If you use `nvm`, run:

  ```bash
  nvm install
  nvm use
  ```

  The project includes an `.nvmrc` file for version consistency.

* **npm** – Comes with Node.js.

  > ⚠️ Use **only npm**. Do not mix with Yarn or pnpm, as this can cause dependency lock issues.

* **Git** – For version control.

---

## 2. Environment Variables

Copy the example environment file and adjust values as needed:

```bash
cp .env.example .env.local
```

* `/.env.example` contains sample keys.
* `/.env.local` is ignored by git and should store local configuration (API keys, secrets).

Do not commit sensitive values.

---

## 3. Clone the Repository

Clone the repo and enter the project directory (use your fork or the canonical repository URL):

```bash
git clone <your-repo-url>
cd Doses
```

---

## 4. Install Dependencies

Install project dependencies (recommended reproducible install):

```bash
npm ci
```

Use `npm install` only when intentionally adding or updating packages. `npm ci` is preferred for CI or clean installs because it installs from `package-lock.json` deterministically.

---

## 5. Running the Application

### Development

```bash
npm run dev
```

* Starts Next.js with Fast Refresh.
* Accessible at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

* Compiles and optimizes for production.
* Output is stored in `.next`.

---

## 6. Available Scripts

The following npm scripts are available:

* **`npm run dev`** – Start the dev server.
* **`npm run build`** – Create an optimized production build.
* **`npm run start`** – Run the production build.
* **`npm run lint`** – Run Biome for linting and style checks (project uses Biome, not ESLint/Prettier directly).
* **`npm run typecheck`** – Run the TypeScript compiler in `--noEmit` mode.
* **`npm run test`** – Run the test suite (Vitest).
* **`npm run format`** – Format code with Biome.
* **`npm run preflight`** – Runs a full validation pipeline (install, format, lint, build, typecheck). Recommended before big changes or PRs.

---

## 7. Coding Standards

Contributors must follow project coding standards. Steering and guidance docs live under `.kiro/steering/` and `docs/`:

- **Architecture Overview** → `docs/architecture.md` (high-level)
- **React Guidelines** → `docs/react.md`
- **TypeScript Guidelines** → `docs/typescript.md`
- **Testing Guidelines** → `docs/testing.md`
- **Sentry / steering docs** → `.kiro/steering/`

Run before committing (recommended):

```bash
npm run preflight
```

---

## 8. Development Workflow

* Use **Conventional Commits** for commit messages.
* Ensure all tests pass before opening a PR.
* PRs should reference related issues.
* Pre-commit hooks (via Husky) automatically run lint and formatting checks.

---

## 9. Medication Database

The medication database uses a modular file-per-medication structure for better maintainability:

### Adding New Medications

1. **Use the template**: Copy `docs/medication-template.ts` as a starting point
2. **Follow naming convention**: Use kebab-case (e.g., `amoxicillin-clavulanate.ts`)
3. **Place in correct directory**: `src/lib/quick-reference-database/medications/`
4. **Validate**: Run `npm run typecheck` to ensure proper structure

### File Structure

```
src/lib/quick-reference-database/medications/
├── index.ts           # Auto-aggregation (do not modify)
├── paracetamol.ts     # Individual medication files
├── ibuprofen.ts
└── ...
```

### Key Guidelines

- **Auto-discovery**: New files are automatically included
- **Type safety**: All medications must conform to `QuickReferenceMedication` interface
- **Validation**: Invalid medications are excluded with console warnings
- **Documentation**: See `docs/medication-database-guide.md` for complete guide

### Testing Medications

After adding a medication:

```bash
npm run typecheck  # Verify TypeScript compliance
npm run test       # Run test suite
npm run dev        # Test in development environment
```

---

## 10. Deployment

* Production is deployed via **Vercel** (default for Next.js).
* Ensure environment variables are configured in Vercel Dashboard.
* Before deploying, run locally:

```bash
npm run typecheck && npm run lint && npm run test && npm run build
```

---
