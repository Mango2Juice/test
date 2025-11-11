# 🧼 Clean Code Principles (with Cross-References)

This document defines the **philosophy and expectations** for writing code in this project.
It establishes *why* we do things, while the **TypeScript** and **React guidelines** explain *how* at the language and framework level.

---

## 1. Consistent Code

Code must look and feel uniform across the repo. Consistency makes code easier to scan and reduces the cost of switching contexts.

* **Formatting & Style** → enforced automatically by **Prettier** and **ESLint/Biome**.
* **Naming & Imports** → see **TypeScript Guidelines** for conventions.
* **Component Structure** → see **React Guidelines** for `"use client"` placement, props patterns, and file layout.

---

## 2. Intentional Code

Every line should exist for a clear reason. The intent of the author should be visible to the reader.

* **Expressive Names** → variables, functions, and components should describe purpose, not mechanics.
* **Minimal Comments** → rely on clean naming and structure first; comment only when intent cannot be expressed in code.
* **Clear Data Types** → see **TypeScript Guidelines** on type narrowing, avoiding `any`, and using `unknown` responsibly.
* **Pure Components** → see **React Guidelines** for keeping renders free of hidden side effects.

---

## 3. Adaptable Code

Code should bend without breaking. Future changes must be easy to make.

* **DRY, Modular, Testable** → smaller units over sprawling files.
* **Immutability** → philosophy lives here; **TypeScript Guidelines** provide details on `readonly` and immutability patterns.
* **Reusable UI** → see **React Guidelines** on composition, hooks, and component reusability.
* **Testing** → adaptability requires tests. Tooling and practices are defined in the **Testing Guidelines** (Vitest + RTL + Playwright).

---

## 4. Responsible Code

Code is part of a larger system — technical, legal, and human. It must behave responsibly.

* **Security & Privacy** → never leak secrets or sensitive data. **TypeScript Guidelines** cover language-level practices (e.g., no hardcoded secrets).
* **Error Handling** → fail gracefully. **React Guidelines** cover error boundaries and runtime error tracking (Sentry).
* **Ethics & Law** → respect copyright, data protection, and user safety.

---
