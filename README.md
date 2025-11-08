
# 🧠 Micro Journal AI

> A minimalist, secure, AI-powered journaling web app built with React + Vite + Express.  
> Reflect, record, and receive AI insights — now with a secure backend proxy.

![Vite](https://img.shields.io/badge/Vite-5.4+-yellow?logo=vite)
![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Express](https://img.shields.io/badge/Express-4.19-lightgrey?logo=express)
![Anthropic](https://img.shields.io/badge/Anthropic-Claude_Sonnet_4-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

Micro Journal AI is a secure, minimalist journaling web app that helps you capture reflections and receive AI-powered insights while protecting your privacy.  
Now upgraded with an Express backend proxy that securely handles Anthropic API calls — no exposed API keys in the browser.

**New Features**
- Secure Anthropic API proxy via Express backend
- Server-side `.env` configuration
- Integrated `helmet` and `rate-limit` protection
- Unified `npm run dev` parallel launch (Vite + Server)
- Production-ready serving of built frontend files

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React 18.3 + Vite 5.4 | Modern SPA development |
| Backend | Express.js | Secure API proxy |
| Security | Helmet + express-rate-limit | Production-grade protection |
| AI | Anthropic API | Text generation and reflection |
| Environment | dotenv | Local secret management |
| Dev Tools | concurrently | Run Vite and backend in parallel |

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- npm 9+
- Anthropic API key

### 1️⃣ Clone & install
```
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
npm install
```

### 2️⃣ Environment setup
Create `.env` or copy `.env.example`:

```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
```

Do **not** use `VITE_ANTHROPIC_API_KEY` anymore; the key is now securely stored server-side.

### 3️⃣ Run development environment
```
npm run dev
```

This starts both:
- Express backend at `http://localhost:3000`
- Vite frontend at `http://localhost:5173` (proxied API requests)

### 4️⃣ Build for production
```
npm run build
npm start
```
The Express server automatically serves the built frontend (`dist/`).

---

## 🔒 Security Improvements

### Before
- API key accessible from client code via `import.meta.env.VITE_ANTHROPIC_API_KEY`
- Direct browser calls to Anthropic endpoint
- Keys exposed in network traffic

### Now
- Server-side `.env` variables only
- Frontend calls go through `/api/generate`
- Helmet for HTTP header protection
- Rate limiting (30 requests/minute per IP)
- Supports compliant deployment under HIPAA/GDPR constraints

---

## 🔧 Verification

Send a test request:

```
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Summarize: Today I felt productive"}'
```

Expected response:
```
{ "provider": "anthropic", "result": { ... } }
```

---

## 🧱 Updated Project Structure

```
micro-journal-ai/
│
├── server.js           # Express backend proxy
├── .env.example        # Environment variable sample
├── .gitignore          # Now includes .env
├── src/                # React frontend
│   └── App.jsx         # Frontend fetches via /api/generate
├── vite.config.js      # Configured dev proxy
├── package.json        # With "type": "module" and new scripts
├── FIXES.md            # Summary of architectural/security updates
└── dist/               # Built production assets
```

---

## ⚙️ Scripts

| Script | Description |
|--------|--------------|
| `npm run dev` | Runs Vite + Express concurrently |
| `npm run build` | Builds production-ready frontend |
| `npm start` | Starts Express backend (serving `/dist`) |
| `npm run preview` | Vite’s static preview mode (optional) |

---

## 🌐 Deployment

### Single-Server Hosting (Default)
1. Build:  
   `npm run build`
2. Start production server:  
   `npm start`
3. App runs at `http://localhost:3000`

Frontend and backend run on the same server with integrated proxy routing.

### Example: Render or Railway
- Add `ANTHROPIC_API_KEY` environment variable in the dashboard.
- Render command:  
  `npm run build && npm start`

### Example: Vercel (using custom Express server)
Use `vercel.json`:
```
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "buildCommand": "npm run build"
}
```

---

## 🧠 Application Logic Recap

- Frontend submits a user prompt to `/api/generate`
- Express receives and forwards request to Anthropic API
- Responses are returned securely from the backend
- Prompts and logs never stored

---

## 🧪 QA Verification Checklist

- [x] App boots with `npm run dev`
- [x] `/api/health` returns `{ "status": "ok" }`
- [x] `.env` keys not required in frontend config
- [x] Proxy works without CORS issues
- [x] Build serves successfully in production
- [x] Rate limit restricts overuse appropriately

---

## 📜 License

MIT License © 2025 Darshil

---

## 🌟 Contributors

- Lead Development and QA review: Darshil  
- Automated backend & security patch: QA Assistant  

---

Ready to deploy your **secure, private journaling AI assistant**.  
Write. Reflect. Grow—safely. 🌱
```
