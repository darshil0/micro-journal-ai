# Micro Journal AI

A minimalist, AI-powered journaling web app with mood detection and personalized insights.

![Version](https://img.shields.io/badge/version-2.1.2-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Overview

This project is a web-based journaling application that uses AI to provide users with insights into their moods and thoughts. It features a simple and intuitive interface for writing and reviewing journal entries.

**Privacy First:** All journal entries are stored locally in your browser's localStorage. Entries are only sent to the server when requesting AI insights, and are never permanently stored on our servers.

## Features

- ✨ **AI-Powered Insights**: Get personalized insights and mood analysis for your journal entries using Anthropic's Claude API
- 🎨 **Simple Interface**: A clean and minimalist interface for a focused writing experience
- 🔒 **Privacy-First**: All journal entries are stored locally in your browser
- 💾 **Export/Import**: Backup and restore your entries anytime
- ⚠️ **Storage Monitoring**: Automatic warnings when approaching localStorage limits
- 🛡️ **Secure Backend**: Protected API proxy with rate limiting and input validation
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Usage

### Development

Start both the backend server and Vite development server:

```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3000`
- Frontend development server on `http://localhost:5173`

### Production

Build and start the production server:

```bash
npm run build
npm start
```

The production server will serve the built frontend and API on `http://localhost:3000`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development servers (backend + frontend) |
| `npm run server:dev` | Starts only the backend server with nodemon |
| `npm run client:dev` | Starts only the Vite development server |
| `npm start` | Starts the production server |
| `npm run build` | Builds the application for production |
| `npm run preview` | Previews the production build |
| `npm run lint` | Lints the source code |
| `npm run lint:fix` | Lints and fixes the source code |
| `npm run format` | Formats the source code with Prettier |
| `npm run format:check` | Checks code formatting |
| `npm test` | Runs the test suite |
| `npm run test:coverage` | Runs tests with coverage report |

## Project Structure

```
micro-journal-ai/
├── src/
│   ├── components/          # React components
│   │   ├── ErrorBoundary.jsx
│   │   ├── ExportImport.jsx
│   │   ├── PrivacyNotice.jsx
│   │   └── StorageWarning.jsx
│   ├── utils/              # Utility functions
│   │   ├── apiUtils.js
│   │   └── storageUtils.js
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── tests/                  # Test files
│   ├── api.test.js
│   └── storage.test.js
├── server.js               # Express backend server
├── .env.example            # Example environment variables
├── package.json
├── vite.config.js
└── README.md
```

## API Endpoints

### Health Check
```
GET /api/health
```
Returns the server status.

### Get AI Insights
```
POST /api/insights
Content-Type: application/json

{
  "entry": "Your journal entry text here"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "mood": "happy",
    "insights": [
      "Insight 1",
      "Insight 2",
      "Insight 3"
    ],
    "reflection": "A gentle reflection or question"
  },
  "timestamp": "2025-11-23T12:00:00.000Z"
}
```

## Security Features

- **Rate Limiting**: API endpoints are rate-limited (10 requests per 15 minutes by default)
- **Input Validation**: All user inputs are validated and sanitized
- **CORS Protection**: Configured for specific origins only
- **Helmet Security Headers**: Enhanced security headers via Helmet.js
- **Request Size Limits**: Body parser limited to 50KB
- **Environment Validation**: Server won't start without required environment variables

## Storage & Privacy

### Local Storage
- All journal entries are stored in your browser's localStorage
- Maximum storage: ~5-10MB (browser dependent)
- Clearing browser data will delete all entries
- **Recommendation**: Export your data regularly

### AI Processing
- Entries are sent to the backend only when requesting AI insights
- The backend forwards requests to Anthropic's Claude API
- No entries are permanently stored on the server
- AI insights are returned directly to your browser

### Data Export/Import
- Export your entries as JSON files anytime
- Import previously exported files to restore entries
- Duplicate entries are automatically skipped during import

## Troubleshooting

### Server won't start
- Ensure your `.env` file exists and contains a valid `ANTHROPIC_API_KEY`
- Check that port 3000 is not already in use
- Verify Node.js version is 18.0.0 or higher

### CORS errors
- Make sure `FRONTEND_URL` in `.env` matches your frontend URL
- In development, this should be `http://localhost:5173`

### Storage quota exceeded
- Export your entries using the Export button
- Delete old entries you no longer need
- Import entries into a different browser if needed

### AI insights failing
- Verify your Anthropic API key is valid
- Check your API quota/credits on the Anthropic console
- Ensure your network connection is stable
- Check server logs for detailed error messages

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Tests include:
- API endpoint validation
- Storage utilities
- Error handling
- Rate limiting
- Input validation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

### v2.1.2 (Current)
- Fixed CORS configuration for production and development
- Added comprehensive error handling and retry logic
- Implemented storage quota monitoring with warnings
- Added export/import functionality
- Enhanced input validation and security measures
- Added rate limiting to prevent API abuse
- Improved error messages and user feedback
- Added privacy notice component
- Created comprehensive test suite
- Updated documentation with security and privacy details

### v2.1.1
- Updated README.md to standard GitHub format
- Incremented patch version

### v2.1.0
- Added comprehensive test suite with unit, integration, and E2E tests
- Created TEST_EVIDENCE.md document

### v2.0.0
- Overhauled frontend architecture to modular components
- Removed Firebase dependency, replaced with localStorage
- Aligned frontend with backend using Anthropic API
- Improved code quality, maintainability, and security

### v1.0.1
- Initial release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Anthropic](https://www.anthropic.com/) for the Claude API
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [React](https://react.dev/) for the UI framework
- [TailwindCSS](https://tailwindcss.com/) for styling

## Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review existing [GitHub Issues](https://github.com/darshil0/micro-journal-ai/issues)
3. Create a new issue with detailed information about your problem

---

**⭐ If you find this project helpful, please consider giving it a star!**
