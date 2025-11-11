# Doses

![Doses Logo](public/icons/icon-512x512.png)

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Mango2Juice/test?utm_source=oss&utm_medium=github&utm_campaign=Mango2Juice%2Ftest&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

Doses is a web-based Progressive Web Application (PWA) meticulously designed to assist healthcare professionals in accurately calculating medication dosages for pediatric and adult patients. Our primary goal is to enhance patient safety by providing a reliable, user-friendly tool that bases calculations on established medical standards and patient-specific information.

## Overview

Doses offers a streamlined and intuitive interface for quickly and precisely determining drug dosages. Its homepage features a **Quick Drug Reference** that provides instant, weight-based dosage calculations for a curated list of common medications, filterable by clinical complaint. For more in-depth information, the app includes a comprehensive **Drug Glossary** and a collection of other essential **Medical Calculators** (e.g., Pregnancy Due Date, Framingham Risk Score).

This tool is intended to support healthcare providers in minimizing the risk of dosage errors and improving the efficiency of medication administration in various care settings.

## Safety and Disclaimer

**Doses is an informational tool only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare professional with any questions you may have regarding a medical condition or treatment. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.**

The dose calculations provided by Doses are based on established guidelines and formulas. However, individual patient factors and clinical judgment are paramount in determining the final appropriate dose. Users are solely responsible for verifying the accuracy of all calculations and ensuring that the prescribed dosage is safe and effective for the individual patient.

## Features

Doses is equipped with features designed to provide accurate and reliable medication dosage calculations:

-   **Quick Drug Reference:** A mobile-first homepage that provides immediate, weight-based dosage calculations for common medications, filterable by clinical complaint.
-   **Drug Glossary:** A comprehensive, searchable medication database with detailed information on indications, contraindications, and dosing profiles, with deep-dive pages for individual drugs.
-   **Medical Calculators:** A suite of essential clinical tools, including:
    -   Pregnancy Due Date Calculator
    -   Neonate Weight Loss Calculator
    -   STOP-BANG Score for Obstructive Sleep Apnea
    -   Ideal Body Weight (IBW) Calculator
    -   Centor Score for Strep Pharyngitis
    -   Framingham Risk Score
    -   Depression Anxiety Stress Scale (DASS-21)
    -   Patient Health Questionnaire-9 (PHQ-9)
-   **Responsive & Mobile-Optimized:** A clean, intuitive interface designed for seamless functionality across desktops, tablets, and smartphones, with enhanced touch targets and mobile-first layouts.
-   **Offline Support (PWA):** As a Progressive Web Application, Doses can be installed and used offline, providing critical access to dosage calculations even without internet connectivity.
-   **Safety-First Design:** Implements robust error handling and presents clear warnings for potential safety concerns, such as exceeding maximum doses or age/weight restrictions.

## Technology Stack

Doses is built using the following technologies, chosen for their performance, maintainability, and suitability for building a robust web application:

-   **Next.js:** A powerful React framework enabling a hybrid of server-side rendering and client-side interactivity with the App Router.
-   **TypeScript:** Provides static typing to enhance code quality, readability, and reduce runtime errors.
-   **Tailwind CSS:** A utility-first CSS framework for rapid and consistent styling, ensuring a responsive design.
-   **Radix UI:** A collection of unstyled, accessible UI components that serve as a foundation for building custom design systems.
-   **shadcn/ui:** A library of accessible and customizable UI components built on top of Radix UI and Tailwind CSS.
-   **Zustand:** A small, fast, and scalable state-management solution for managing client-side state.
-   **Vitest:** A blazing-fast unit test framework powered by Vite, used for unit and integration testing.

## Installation and Getting Started

To set up and run Doses locally for development or testing, please follow these steps:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/example/Doses.git
    cd Doses
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Open [http://localhost:3000](http://localhost:3000) in your web browser to access the application.

## Developing

If you wish to contribute to the development of Doses, please adhere to the following guidelines:

-   **Branching Strategy:** We utilize a feature branching strategy. Please create a new branch for each feature or bug fix you are working on.
-   **Commit Message Guidelines:** Write clear, concise, and descriptive commit messages that explain the purpose of each commit.
-   **Pull Request Process:** Submit pull requests to the main branch for review. Ensure your pull request includes a clear description of the changes and links to any relevant issues.
-   **Code Style Guidelines:** Follow the established code style and linting rules enforced in the project (see `biome.json`).
-   **Testing:** Write unit and integration tests for your changes, especially for critical logic like dose calculations.

## Contributing

Thank you for considering contributing to Doses! We welcome contributions that help improve the application and enhance patient safety. Contributions can include bug reports, feature requests, documentation improvements, and code contributions.

To contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your contribution (`git checkout -b feature/your-feature-name`).
3.  Make your changes, ensuring they adhere to the development guidelines.
4.  Commit your changes with clear and concise commit messages.
5.  Push your changes to your fork (`git push origin feature/your-feature-name`).
6.  Submit a pull request to the main repository, providing a detailed description of your changes.

## Future Enhancements

We have several potential enhancements planned for Doses to further improve its functionality and usability:

-   **User Authentication and Profiles:** Allowing healthcare professionals to create accounts and save preferences.
-   **Advanced Search and Filtering:** Enhancing the ability to search and filter medications and diagnoses based on various criteria.
-   **More Comprehensive Resource Library:** Expanding the library with additional equations, charts, and relevant medical resources.

## Licensing

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.
