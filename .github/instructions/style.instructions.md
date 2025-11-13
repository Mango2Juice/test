# Code Style & Quality Guidelines

This document outlines the code style and quality standards enforced by Biome.js in this project. All code must comply with these rules.

## Formatting Rules

### Basic Formatting
- **Line Width**: Maximum 120 characters
- **Indentation**: 2 spaces (space indentation, not tabs)
- **Quotes**: Single quotes for JavaScript/TypeScript and JSX
- **Semicolons**: As needed (ASI-safe) - only where required to prevent errors

### File Scope
- Apply formatting to all files in `src/**`
- Exclude: `node_modules`, `.next`, `public`, `globals.css`, `.vscode`, `.idx`, `.kiro`

## Linting Rules

### Configuration
- **All Recommended Rules**: Enabled by default from Biome's recommended ruleset
- **Domain-Specific Rules**: Next.js, React, Project, and Testing rules all set to "recommended"
- **Assist Actions**: All recommended assist actions enabled for code improvements

### Key Rule Categories (from Biome Recommended)

#### Correctness Rules
- Prevent runtime errors and logical mistakes
- Ensure proper variable declarations and imports
- Validate React component patterns and prop usage
- Check for undeclared dependencies and variables

#### Style Rules
- Enforce consistent code style and patterns
- Prefer modern JavaScript/TypeScript constructs
- Ensure readable and maintainable code structure
- Standardize import/export patterns

#### Performance Rules
- Optimize code for better runtime performance
- Prevent common performance anti-patterns
- Encourage efficient coding practices

#### Security Rules
- Prevent common security vulnerabilities
- Enforce safe coding practices
- Validate potentially dangerous operations

### Domain-Specific Enhancements
- **Next.js Rules**: Framework-specific best practices and optimizations
- **React Rules**: Component patterns, hooks usage, and JSX standards
- **Project Rules**: General project-wide coding standards
- **Testing Rules**: Test file patterns and best practices

For complete rule details, see: https://biomejs.dev/linter/rules/

## Code Examples

### ✅ Good
```typescript
// Single quotes, no unnecessary semicolons
const message = 'Hello world'

// Named imports instead of namespace
import { useState, useEffect } from 'react'

// Simplified logic
const isValid = user && user.isActive

// Array literals
const items = []

// Positive conditions
if (isLoggedIn) {
  showDashboard()
} else {
  showLogin()
}
```

### ❌ Bad
```typescript
// Double quotes, unnecessary semicolons
const message = "Hello world";

// Namespace import
import * as React from 'react'

// Complex logic that can be simplified
const isValid = !!(user && user.isActive)

// Array constructor
const items = new Array()

// Negated else
if (!isLoggedIn) {
  showLogin()
} else {
  showDashboard()
}
```

## Commands
- `npm run lint` - Check for linting errors
- `npm run format` - Format code according to rules
- `npm run check` - Run all Biome checks
- `npm run fix` - Auto-fix issues where possible

## Integration
These rules are enforced through:
- Biome.js linter and formatter
- Git hooks (if configured)
- CI/CD pipeline checks
- IDE integration (recommended)

## Reference
- **Biome Rules Documentation**: https://biomejs.dev/linter/javascript/rules/#recommended-rules
- **Recommended Rules**: All rules marked as "recommended" in Biome's ruleset are enabled
- **Configuration**: See `biome.json` for the complete configuration
