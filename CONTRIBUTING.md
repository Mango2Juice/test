# Contributing to Doses

First off, thank you for considering contributing to Doses! Your help is invaluable in making this tool safer and more effective for healthcare professionals.

This document provides guidelines for contributing to the project. Please read it carefully to ensure a smooth and effective contribution process.

## How Can I Contribute?

There are many ways to contribute to Doses, including:

-   **Reporting Bugs**: If you find a bug, please create an issue in our GitHub repository. Describe the issue in detail, including steps to reproduce it.
-   **Suggesting Enhancements**: If you have an idea for a new feature or an improvement to an existing one, please create an issue to discuss it.
-   **Submitting Pull Requests**: If you want to contribute code, you can submit a pull request with your changes.

## Development Setup

To get started with development, please follow the instructions in our [Development Instructions](docs/development.md) document. This will guide you through setting up the project locally.

## Coding Standards

To maintain code quality and consistency, we ask that you follow our established coding standards. These are defined in the following documents:

-   [Clean Code Principles](docs/clean-code.md)
-   [TypeScript Guidelines](docs/typescript.md)
-   [React Guidelines](docs/react.md)
-   [Code Style & Quality Guidelines (Biome)](.kiro/steering/style.md)

Before submitting your changes, please ensure your code is formatted and linted correctly by running:

```bash
npm run check
```

## Testing

All contributions must include appropriate tests to ensure that new features work as expected and that existing functionality is not broken.

-   **Unit Tests**: For isolated functions and logic.
-   **Component/Integration Tests**: For React components and their interactions.

Run all tests before submitting a pull request:

```bash
npm run test
```

Please refer to our [Testing Instructions](docs/testing.md) for more details on our testing strategy.

## Pull Request Process

1.  **Fork the repository** and create a new branch from `main` for your changes.
2.  **Make your changes**, ensuring you follow the coding standards and add appropriate tests.
3.  **Ensure all tests pass** by running `npm run test`.
4.  **Update the documentation** if your changes affect it.
5.  **Submit a pull request** to the `main` branch of the Doses repository.
6.  **Provide a clear description** of your changes in the pull request, including the problem you are solving and the approach you took. Reference any relevant issues.
7.  **Your pull request will be reviewed** by the maintainers, who may suggest changes. Please be responsive to feedback.

## Code of Conduct

All contributors are expected to follow our Code of Conduct. Please be respectful and professional in all your interactions with the community. (A formal Code of Conduct document will be added in the future).

Thank you again for your interest in contributing to Doses!
