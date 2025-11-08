# 🧠 Micro Journal AI

> A minimalist, secure, AI-powered journaling web app built with React + Vite + Express.  
> Reflect, record, and receive AI insights — now with a secure backend proxy to safeguard your API key.

![Vite](https://img.shields.io/badge/Vite-5.4+-yellow?logo=vite)  
![React](https://img.shields.io/badge/React-18.3-blue?logo=react)  
![Express](https://img.shields.io/badge/Express-4.19-lightgrey?logo=express)  
![Anthropic](https://img.shields.io/badge/Anthropic-Claude_Sonnet_4-orange)  
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

Micro Journal AI is a privacy-first journaling application that lets you capture daily reflections and get personalized AI-powered insights using Anthropic’s Claude Sonnet 4 model. The latest version features a secure Express backend proxy that safely handles API calls, preventing exposure of your Anthropic API key in the client.

---

## 🛠️ Tech Stack

| Layer      | Technology           | Purpose                                        |
|------------|----------------------|------------------------------------------------|
| Frontend   | React 18.3 + Vite 5.4 | Modern single-page application with fast build |
| Backend    | Express.js           | Secure API proxy server                         |
| Security   | Helmet + Rate Limiter| HTTP security headers and request rate limiting |
| AI         | Anthropic API        | Text generation and AI journaling insights     |
| Environment| dotenv               | Server-side environment variable management    |
| Dev Tools  | concurrently         | Run backend and frontend servers concurrently  |

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18 or higher  
- npm 9 or higher  
- Anthropic API key  

### 1️⃣ Clone the repository and install dependencies

```
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
npm install
```

### 2️⃣ Configure environment

Create a `.env` file in the project root (or copy from `.env.example`):

```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
```

> **Important:** The Anthropic API key is stored *only* server-side. Do **not** use `VITE_ANTHROPIC_API_KEY` in the frontend. This prevents key exposure in browser network requests.

### 3️⃣ Start development environment

```
npm run dev
```

This runs the Express backend proxy on `http://localhost:3000` and the React frontend dev server on `http://localhost:5173` with API requests securely proxied.

### 4️⃣ Build and run production

```
npm run build
npm start
```

The Express server serves the optimized frontend from the `dist/` directory on the port defined by the `PORT` environment variable (default 3000).

---

## 🔒 Security Features

- Server-side environment variable handling for API keys  
- API requests proxied through Express backend, never exposed to the client  
- HTTP header protection via Helmet middleware  
- Request rate limiting (30 requests/minute per IP) to prevent abuse  
- Clear separation of frontend and backend concerns for HIPAA/GDPR compliance when deployed  

---

## 🧪 API Verification

Test the backend API endpoint directly to verify operation:

```
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Summarize: Today was productive"}'
```

Expected JSON response:

```
{ "provider": "anthropic", "result": { ... } }
```

---

## 📁 Project Structure

```
micro-journal-ai/
├── server.js           # Express backend with Anthropic proxy and security
├── .env.example        # Sample environment variables
├── .gitignore          # Includes `.env` for security
├── src/                # React frontend source code
│   └── App.jsx         # Frontend React component calling backend API
├── vite.config.js      # Vite config with proxy setup for development
├── package.json        # Project dependencies and npm scripts
├── FIXES.md            # Documentation of architectural and security fixes
└── dist/               # Production-ready frontend build output
```

---

## ⚙️ Available Scripts

| Command          | Description                                  |
|------------------|----------------------------------------------|
| `npm run dev`    | Run backend and frontend dev servers concurrently |
| `npm run build`  | Create production frontend build             |
| `npm start`      | Start Express backend server serving the production build |
| `npm run preview`| Preview production build locally (optional) |

---

## 🌐 Deployment Recommendations

- Deploy as a single Node.js server hosting both backend proxy and frontend static assets  
- Configure `ANTHROPIC_API_KEY` environment variable securely in your host  
- Recommended hosting platforms: Render, Railway, Vercel, Netlify (with custom backend), or any VPS  
- Ensure rate limiting and security middleware stay enabled in production  
- Rebuild frontend after changing environment variables (Vite embeds env at build time)

---

## 🤝 Contributing

Contributions and feedback are welcome! Fork the repo, create feature branches, test your changes thoroughly, and open pull requests with descriptive commit messages.

---

## 📜 License

MIT License © 2025 Darshil

---

Built with ❤️ by Darshil — providing a secure, private journaling experience powered by advanced AI insights.

---

*Your reflections are valuable. Micro Journal AI supports your mindful growth with privacy and security as top priorities.*
