# Doses Architecture Overview

This document provides a high-level overview of the technical architecture of the Doses application. It is intended to help developers understand the project structure, key technologies, data flow, and design patterns used.

## 1. Core Technologies

The application is built on a modern, type-safe, and performant technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router) is used as the primary React framework. This enables a hybrid approach of Server Components for performance and Client Components for interactivity.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) is used throughout the project to ensure type safety, improve code quality, and enhance developer experience.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) is used for utility-first styling.
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) provides the foundation for our UI components. These are not a traditional component library but rather a collection of reusable components that are directly part of the project's source code under `src/components/ui`.
-   **State Management**:
    -   **Client-Side State**: [Zustand](https://github.com/pmndrs/zustand) is used for managing complex client-side state, particularly for the dose calculator feature (`useCalculatorStore`). It provides a simple, scalable, and hook-based API.
    -   **Data Fetching & Caching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) is integrated for managing asynchronous operations. It is currently set up but not heavily utilized for server data fetching, as most drug data is handled client-side.
-   **Offline Support**: The application is a Progressive Web App (PWA) enabled by the `next-pwa` plugin, allowing for offline access and installation on devices.

## 2. Project Structure

The project is organized into several key directories within the `src/` folder:

-   **`src/app/`**: Contains all pages, layouts, and API routes, following the Next.js App Router conventions. Key pages include the drug category browser (`/`), the dose calculator (`/calculator`), the diagnosis guide (`/diagnosis`), and the resources page (`/resources`).
-   **`src/components/`**: Home to all reusable React components.
    -   `ui/`: Contains the base UI components from Shadcn UI (e.g., `Button`, `Card`, `Input`).
    -   `common/`: Application-wide components like `LoadingSpinner` and custom icons.
    -   `layout/`: Components that define the overall application layout, such as the `AppLayout` and `BottomNavBar`.
-   **`src/lib/`**: A collection of shared libraries, utilities, and core application data.
    - `quick-reference-database/`: Contains the modular medication database (per-medication files under `medications/`) and an auto-aggregation index.
    -   `diagnoses.ts`: Contains the structured data for the Diagnosis Guide.
    -   `formulations.ts`: A centralized list of all available medication formulations.
    -   `utils/`: General utility functions (`cn` for class names) and the core `calculation-utils.ts`.
    -   `stores/`: Contains the Zustand store for managing client-side state.
-   **`src/hooks/`**: Contains custom React hooks for reusable logic, such as `useIsMobile` and `useQuickAccessDrugs`.

## 3. Data Flow and Management

### 3.1. Medication and Diagnosis Data

-   **Source of Truth**: The primary medication and diagnosis data is hardcoded within the application in the `src/lib/` directory. This data is compiled and imported directly for use in the application, ensuring that the core functionality is available offline.
    -   `src/lib/quick-reference-database/index.ts` aggregates all medication data for the calculator.
    -   `src/lib/diagnoses.ts` provides the data for the clinical diagnosis guide.
-   **Loading Strategy**: Medication data is dynamically imported on the homepage (`/`) only when the user interacts with the search bar. This lazy-loading strategy improves initial page load performance by not including the large drug database in the main JavaScript bundle.

Where calculations live

The core dosing implementation is contained in dedicated calculation modules under the quick-reference database:

- `src/lib/quick-reference-database/calculations/helpers.ts` — conversion and profile-based helper functions (e.g., `computeDoseFromProfile`, `convertAmountToMg`).
- `src/lib/quick-reference-database/calculations/pediatric.ts` — pediatric dosing entrypoint used by the calculator store and UI.

### 3.2. User-Specific Data

-   **Quick Access**: The `useQuickAccessDrugs` hook manages a "Quick Access" list of frequently used drugs. It tracks usage counts in the browser's **localStorage** under the key `doses-drug-usage`, with migration logic to handle data from older keys.

## 4. State Management (`Zustand`)

The dose calculator's state is managed entirely by a Zustand store located at `src/lib/stores/calculator-store.ts`. This store is the single source of truth for:

-   The list of all available and filtered drugs.
-   User inputs for the calculator (selected drug, weight, age, etc.).
-   The current calculation method and formulation.
-   The final calculated results and any associated warnings or errors.
-   Validation state for form inputs.

All calculations are performed by pure functions in `calculation-utils.ts` and are triggered by actions within the Zustand store. Components subscribe to this store and re-render only when the state they depend on changes, ensuring efficient updates.

## 5. Rendering Strategy (Server & Client Components)

The application leverages the Next.js App Router to optimize rendering:

-   **Server Components**: Static pages and layout components are primarily rendered on the server. This reduces the amount of JavaScript sent to the client, leading to faster initial page loads. Examples include `src/app/layout.tsx` and static content pages.
-   **Client Components**: Any component requiring interactivity, state, or browser-only APIs (like `useEffect`, `useState`, or accessing `localStorage`) is marked with the `'use client'` directive. The homepage search, the entire calculator feature, and the diagnosis guide are prime examples of client-side interactive islands within the application.

This hybrid approach provides the performance benefits of server-side rendering with the rich interactivity of a single-page application.
