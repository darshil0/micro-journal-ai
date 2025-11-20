# Micro Journal AI

A minimalist, AI-powered journaling web app with mood detection and personalized insights.

**Version: 2.1.0**

## Overview

This project is a web-based journaling application that uses AI to provide users with insights into their moods and thoughts. It features a simple and intuitive interface for writing and reviewing journal entries. The backend is powered by Node.js and Express, and the frontend is built with React and Vite.

**Note:** All journal entries are stored locally in your browser's local storage. No data is ever sent to a server.

## Features

-   **AI-Powered Insights:** Get personalized insights and mood analysis for your journal entries.
-   **Simple Interface:** A clean and minimalist interface for a focused writing experience.
-   **Secure Backend:** A secure backend proxy to protect your API keys.
-   **100% Private:** All journal entries are stored locally in your browser.
-   **Easy Setup:** Get up and running with just a few commands.

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

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm start`: Starts the production server.
-   `npm run build`: Builds the application for production.
-   `npm run preview`: Previews the production build.
-   `npm run lint`: Lints the source code.
-   `npm run lint:fix`: Lints and fixes the source code.
-   `npm run format`: Formats the source code.
-   `npm run format:check`: Checks the formatting of the source code.
-   `npm run test`: Runs the unit and integration tests.
-   `npm run test:e2e`: Runs the end-to-end tests.

## Changelog

**v2.1.0**
- Added a comprehensive test suite with unit, integration, and E2E tests.
- Created a `TEST_EVIDENCE.md` document to provide a full overview of the testing strategy and results.

**v2.0.0**
- Overhauled the frontend architecture from a single monolithic component to a modular, component-based structure.
- Removed the Firebase dependency and replaced it with local storage for all journal entries.
- Aligned the frontend with the backend by removing all Gemini-related code and integrating with the Anthropic API proxy.
- Improved code quality, maintainability, and security.

**v1.0.1**
- Initial release.

## Changelog

**v2.0.0**
- Overhauled the frontend architecture from a single monolithic component to a modular, component-based structure.
- Removed the Firebase dependency and replaced it with local storage for all journal entries.
- Aligned the frontend with the backend by removing all Gemini-related code and integrating with the Anthropic API proxy.
- Improved code quality, maintainability, and security.

**v1.0.1**
- Initial release.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
A minimalist AI-powered journaling web app built with React, Vite, and TailwindCSS. Capture daily reflections, generate personalized insights using Anthropic’s Claude API, and keep all data private…
