# Micro Journal AI

![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Issues](https://img.shields.io/github/issues/darshil0/micro-journal-ai.svg)

A minimalist, AI-powered journaling web app with mood detection and personalized insights.

---

## Overview
This project is a web-based journaling application that uses AI to provide users with insights into their moods and thoughts. It features a simple and intuitive interface for writing and reviewing journal entries. The backend is powered by Node.js and Express, and the frontend is built with React and Vite.

**Note:** All journal entries are stored locally in your browser's local storage. No data is ever sent to a server.

---

## Features
-   **AI-Powered Insights:** Get personalized insights and mood analysis for your journal entries using Anthropic's Claude API.
-   **Simple Interface:** A clean and minimalist interface for a focused writing experience.
-   **Secure Backend:** A secure backend proxy to protect your API keys.
-   **100% Private:** All journal entries are stored locally in your browser.
-   **Easy Setup:** Get up and running with just a few commands.

---

## Getting Started

### Prerequisites
-   Node.js (v18.0.0 or higher)
-   npm (v8.0.0 or higher)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/darshil0/micro-journal-ai.git
    cd micro-journal-ai
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Anthropic API key:
    ```bash
    ANTHROPIC_API_KEY="your_api_key_here"
    ```

### Running the Application
-   **Development:**
    ```bash
    npm run dev
    ```
    This will start the backend server and the Vite development server concurrently.

-   **Production:**
    ```bash
    npm run build
    npm start
    ```

---

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server. |
| `npm start` | Starts the production server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Previews the production build. |
| `npm run lint` | Lints the source code. |
| `npm run lint:fix` | Lints and fixes the source code. |
| `npm run format` | Formats the source code. |
| `npm run format:check` | Checks the formatting of the source code. |
| `npm run test` | Runs the unit and integration tests. |
| `npm run test:e2e` | Runs the end-to-end tests. |

---

## Changelog

**v2.2.0**
- Fixed AI insight rendering issue by replacing manual markdown parsing with `react-markdown`.
- Patched `esbuild` vulnerability by using an `overrides` block in `package.json`.
- Improved test configuration for Vitest and Playwright.
- Added `@tailwindcss/typography` plugin for better markdown styling.

**v2.1.1**
- Updated `README.md` to a more standard GitHub format.
- Incremented patch version.

**v2.1.0**
- Added a comprehensive test suite with unit, integration, and E2E tests.
- Created a `TEST_EVIDENCE.md` document to provide a full overview of the testing strategy and results.

### v2.0.0
- Overhauled the frontend architecture from a single monolithic component to a modular, component-based structure.
- Removed the Firebase dependency and replaced it with local storage for all journal entries.
- Aligned the frontend with the backend by removing all Gemini-related code and integrating with the Anthropic API proxy.
- Improved code quality, maintainability, and security.

**v1.0.1**
- Initial release.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
