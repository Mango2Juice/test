# Testing Instructions

This document outlines the testing strategy, tools, and conventions used in the Doses application. A robust testing approach is crucial for maintaining code quality, preventing regressions, and ensuring the accuracy of dose calculations.

## 1. Testing Philosophy

Our testing strategy balances **unit**, **integration**, and **end-to-end (E2E)** testing to ensure reliability while maintaining development speed.

*   **Unit Tests**: Used for isolated, pure logic (e.g., calculation functions in `src/features/calculator/utils/`). They should be fast, deterministic, and dependency-free.
*   **Integration/Component Tests**: Verify how multiple components work together, primarily using React Testing Library. These tests simulate user interactions and check rendered output, mirroring how the UI behaves in real usage.
*   **End-to-End Tests (E2E)**: Run in a real browser with Playwright. They test the full stack (frontend + backend) to ensure user-critical workflows function as expected.

## 2. Core Technologies

*   **[Vitest](https://vitest.dev/)**: The primary unit and integration testing framework. It offers lightning-fast test runs, built-in TypeScript support, and a Jest-compatible API (`vi.mock`, `vi.fn`, etc.).
*   **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: For writing component tests from a user’s perspective. Encourages querying by accessible roles and text instead of implementation details.
*   **[Playwright](https://playwright.dev/)**: For end-to-end browser testing. Provides cross-browser automation and reliable assertions for UI flows.
*   **[JSDOM](https://github.com/jsdom/jsdom)**: A pure-JavaScript implementation of web standards, used to create a simulated DOM environment for tests running in Node.js.

## 3. Running Tests

### Unit and Integration Tests (Vitest)

Run all unit/component tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run with coverage:

```bash
npm run test:coverage
```

> Test files should end with `.test.ts`, `.spec.ts`, `.test.tsx`, or `.spec.tsx`.

Note: The repository includes a shared test setup file at `src/test/setup.ts` which imports test utilities (for example, `@testing-library/jest-dom`). Ensure it exists and is imported by Vitest via the project config; tests may fail if this setup file is missing.

### End-to-End Tests (Playwright)

Run the full suite:

```bash
npm run e2e
```

Run in headed mode (open browser window):

```bash
npm run e2e:debug
```

## 4. Writing Tests

### File Naming and Location

Tests should live next to the files they test:

*   Component: `src/components/my-component.test.tsx`
*   Utility: `src/features/calculator/utils/calculation-utils.test.ts`

### Example: Utility Test (Vitest)

```ts
// src/features/calculator/utils/calculation-utils.test.ts
import { describe, it, expect } from 'vitest'
import { calculateDose } from './calculation-utils'
import { mockParacetamol } from 'path/to/mock/data'

describe('calculateDose Utility', () => {
  it('calculates weight-based dose correctly', () => {
    const { calculationResult, errors } = calculateDose({
      drug: mockParacetamol,
      calculationMethod: 'weight',
      weightKg: '10',
    })

    expect(errors).toEqual({})
    expect(calculationResult?.doseMg).toBe('150.00')  // 10kg * 15mg/kg
    expect(calculationResult?.adminVolumeMl).toBe('6.3')
  })
})
```

### Example: Component Test (React Testing Library + Vitest)

```tsx
// src/components/common/error-message.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ErrorMessage from './error-message'

describe('ErrorMessage Component', () => {
  it('renders the message when provided', () => {
    const errorMessage = 'This is a test error.'
    render(<ErrorMessage message={errorMessage} />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('renders nothing when no message is provided', () => {
    const { container } = render(<ErrorMessage message={undefined} />)
    expect(container.firstChild).toBeNull()
  })
})
```

### Example: End-to-End Test (Playwright)

```ts
// e2e/calculator.spec.ts
import { test, expect } from '@playwright/test'

test('user can calculate dose', async ({ page }) => {
  await page.goto('http://localhost:3000/calculator')

  await page.fill('input[name="weight"]', '10')
  await page.click('button:has-text("Calculate")')

  await expect(page.getByText('150.00 mg')).toBeVisible()
  await expect(page.getByText('6.3 ml')).toBeVisible()
})
```

## 5. Best Practices

*   **Test behavior, not implementation**: Focus on user-visible outcomes, not component internals.
*   **Prefer accessible queries**: Use `getByRole`, `getByLabelText`, or visible text over `data-testid`, unless unavoidable.
*   **Isolate tests**: Keep each test independent. Use `beforeEach`/`afterEach` for setup and cleanup.
*   **Clear descriptions**: Write human-readable test names using `describe` and `it` blocks.
*   **Balance**: Use Vitest for unit/integration speed, and Playwright sparingly for high-value user flows.

---
