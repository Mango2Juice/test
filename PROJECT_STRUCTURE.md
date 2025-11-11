# Project Structure

This document outlines the main folders and their contents within the project.

- **`.github`**: Contains GitHub-specific files, including CI/CD workflows and issue templates.
- **`.kiro`**: Contains specifications and steering documents for the AI development assistant.
- **`.vscode`**: Contains configuration files for the VS Code editor, such as settings and launch configurations.
- **`docs`**: Contains project documentation, such as architecture overviews, guidelines, and feature designs.
- **`public`**: Contains static assets that are served directly, including images, icons, the PWA manifest, and service worker files.
- **`src`**: The main source code for the application.
  - **`app`**: Contains application-level components, styles, and routes, following the Next.js App Router convention. Key routes include:
    - `/`: The main Quick Drug Reference homepage.
    - `/calculators`: A directory of various medical calculators.
    - `/drug/[drugId]`: The detailed information page for a specific drug.
  - **`components`**: Reusable React components used throughout the application.
    - **`common`**: Generic, application-wide components like `LoadingSpinner`.
    - **`layout`**: Components related to the application's overall layout, such as the `AppLayout` and `BottomNavBar`.
    - **`quick-reference`**: Components specifically for the Quick Drug Reference homepage.
    - **`ui`**: Core UI components built on `shadcn/ui` (e.g., `Button`, `Card`, `Input`).
  - **`hooks`**: Custom React hooks for reusable logic, such as `useDevice` for responsive design and `useQuickReferenceDatabase` for data access.
  - **`lib`**: Contains utility functions, data structures, and other shared code.
    - **`quick-reference-database`**: The modular, file-per-medication database system.
      - **`medications/`**: Individual medication files, organized into subdirectories by category (e.g., `analgesics`, `antibiotics`).
      - **`index.ts`**: Auto-aggregates all medication files into a single export.
      - **`types.ts`**: TypeScript definitions for the database.
      - **`validation/`**: Data validation rules and schemas.
      - **`calculations/`**: The simplified calculation engine for the quick reference.
    - **`stores`**: Contains Zustand stores (`app-store` and `calculator-store`) for global client-side state management.
    - **`utils`**: General utility functions, including `cn` for class names and various calculators' logic.
  - **`mdx-components.tsx`**: Custom components to be used within MDX files.
- **`tests`**: Contains test files, though the current convention is to co-locate tests with the source files.
