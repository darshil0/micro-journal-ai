# 🧠 Micro Journal AI

> A minimalist, secure, AI-powered journaling web app built with React + Vite + Express.  
> Reflect, record, and receive AI insights — now with a secure backend proxy.

![Vite](https://img.shields.io/badge/Vite-5.4+-yellow?logo=vitehttps://img.shields.io/badge/React-18.3-blue?logo=reacthttps://img.shields.io/badge/Express-4.19-lightgrey?logo=expresshttps://img.shields.io/badge/Anthropic

  
  
  
  
![License](https://img.shields.io/badge/License Overview

Micro Journal AI is a secure, minimalist journaling app designed to preserve your privacy while providing AI-driven insights using Anthropic's Claude Sonnet 4 model. It now features a backend Express proxy to securely handle Anthropic API calls, preventing API key exposure in client requests.

***

## 🛠️ Tech Stack

| Layer      | Technology            | Purpose                                 |
|------------|-----------------------|----------------------------------------|
| Frontend   | React 18.3 + Vite 5.4 | Modern SPA and build tooling            |
| Backend    | Express.js            | Secure API proxy                        |
| Security   | Helmet + rate-limit   | HTTP header protection and abuse control |
| AI         | Anthropic API         | Natural language insights               |
| Environment| dotenv                | Server-side environment variable management |
| Dev Tools  | concurrently          | Parallel dev server and backend launch |

***

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+  
- npm 9+  
- Anthropic API key  

### Clone & Install

```bash
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
npm install
```

### Environment Configuration

Create a `.env` file (or copy `.env.example`) in the project root:

```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
```

**Important:** The Anthropic API key is now stored server-side. Do **not** use `VITE_ANTHROPIC_API_KEY` client-side.

### Run Development Environment

```bash
npm run dev
```

This will concurrently start the backend proxy server (`http://localhost:3000`) and frontend dev server (`http://localhost:5173`), with API calls proxied securely.

### Build & Run Production

```bash
npm run build
npm start
```

The Express server will serve the optimized frontend assets under `dist/`.

***

## 🔒 Security Highlights

- Server-side API key storage using `.env` file and `dotenv`.
- Frontend makes calls only to backend `/api/generate` endpoint — no direct Anthropic API calls.
- HTTP security headers provided by Helmet.
- Rate limiting (30 requests/minute/IP) via express-rate-limit.
- Ready for compliance with HIPAA and GDPR in production deployments when properly configured.

***

## 🧪 Verification

Test your backend API proxy:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Summarize: Today I felt productive"}'
```

Expected JSON response format:

```json
{ "provider": "anthropic", "result": { ... } }
```

***

## 📁 Project Structure

```
micro-journal-ai/
├── server.js           # Express backend with proxy & security
├── .env.example        # Sample environment variables
├── .gitignore          # Ignores .env and others
├── src/                # React frontend source code
│   └── App.jsx         # Main UI and API client
├── vite.config.js      # Dev server proxy configuration
├── package.json        # Scripts & dependencies
├── FIXES.md            # Documentation of fixes/changes
└── dist/               # Production build output
```

***

## ⚙️ NPM Scripts

| Command          | Description                                  |
|------------------|----------------------------------------------|
| `npm run dev`    | Run Express server and Vite dev server in parallel |
| `npm run build`  | Create production build output                |
| `npm start`      | Start Express server serving production build |
| `npm run preview`| Preview production build locally              |

***

## 🌐 Deployment Recommendations

- Host on single server or cloud provider supporting Node.js + static files.  
- Set `ANTHROPIC_API_KEY` securely in environment variables.  
- Use `npm run build && npm start` for production.  
- Platforms like Render, Railway, or Vercel can be configured to support Node backend with static serving.  
- Ensure rate limiting and security headers active to protect API usage.

***

## 🤝 Contributing

Contributions welcome! Fork, branch, test, pull request. See CONTRIBUTING.md for guidelines.  

***

## 📜 License

MIT License © 2025 Darshil

Built with ❤️ by Darshil — a mindful journaling AI experience promoting privacy, security, and personal growth.

***

