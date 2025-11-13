ALWAYS read the `.kiro/steering/*.md` files in the repository root and apply
their guidance to any task you work on.

## Purpose

This file captures the working rules and practical checks for an AI coding
assistant (Copilot-style agent) contributing to this repo. It is intentionally
concise: when in doubt, follow the steering docs in `.kiro/steering/` and the
project-level developer guides in `docs/`.

## Quick agent checklist (must-follow)

- Read `.kiro/steering/*.md` for the task area.
- BEFORE making changes: create and maintain a short todo list to track work
  (use the provided todo-list tool / API). Always keep it updated.
- Use `pnpm install --frozen-lockfile` for reproducible installs when you need dependencies.
- Validate changes with the full preflight before merging:

  ```powershell
  pnpm run preflight
  ```

  `preflight` runs install, format, lint, build, typecheck and tests.

- After any successful file edit you perform, immediately run Codacy CLI
  analysis for each edited file (see the Codacy section below). This is a hard
  repository requirement.

## Codacy / security rules (required)

- When you edit files, run the Codacy CLI analyze tool with:
  - `rootPath` set to the repo root (absolute path)
  - `file` set to the edited file path
  - Include provider/org/repo when the tool accepts them (provider: `gh`,
    organization: `Mango2Juice`, repository: `doseright`).

- If you add or change dependencies (package.json, requirements.txt, pom.xml,
  build.gradle, etc.), immediately run Codacy's Trivy scan (`tool: "trivy"`) to
  detect new vulnerabilities. If vulnerabilities are introduced, stop and
  propose fixes before continuing.

## Build & run (practical)

- Preferred install: `pnpm install --frozen-lockfile` (reproducible; do not use npm or yarn for this repo).
- Development server: `npm run dev` (runs on port 9002 in this project).
- Production build: `npm run build`; run with `npm run start`.

## Testing guidance

- Test framework: Vitest. Use `describe` / `it` / `expect` and `vi` for mocks.
- Test files: co-located with the code, using `.test.ts` or `.test.tsx`.
- Put `vi.mock()` calls that affect module-level constants at the very top of
  the test file (before other imports).

## TypeScript & style highlights

- Avoid `any`. Prefer `unknown` and explicit narrowing.
- Prefer plain objects + TypeScript interfaces over classes.
- Use ES module encapsulation for private/public boundaries.

## React assistant guidance (short)

- Use functional components and Hooks; keep render functions pure.
- Avoid side effects during render; use `useEffect` for synchronization only.
- Follow the Rules of Hooks: call Hooks unconditionally at top-level.
- Prefer composition and small components.

## Process and verification

1. Create/update a todo list using the todo-list tool.
2. Make the smallest clear change required.
3. Run `pnpm run preflight` locally to validate formatting, lint, typecheck,
   tests and build.
4. Run Codacy CLI analyze for each edited file (see Codacy section).
5. If Codacy returns issues from your edits, propose and apply fixes, then
   re-run Codacy analysis.

## Comments and style

- Write high-value inline comments only. Prefer clear naming and small
  functions over comment blocks.
- Prefer hyphens in flag names (e.g., `my-flag`).

## Where to look next

- `docs/` — developer and testing guides.
- `.kiro/steering/` — agent and repo-specific steering rules (read these
  before making edits).

## Final note

If any of the enforced external tools (Codacy CLI, Trivy) are not installed or
available in your environment, tell the user and offer to install or run them
via the repository's MCP server integrations instead. Always surface failures
from the `preflight` or Codacy checks and address them before merging.
