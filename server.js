// server.js — Secure Anthropic API backend proxy

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(express.json({ limit: "1mb" }));

// Rate limiter to avoid abuse
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});
app.use(limiter);

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_KEY) {
  console.warn("⚠️ Missing Anthropic API key. Set ANTHROPIC_API_KEY in .env");
}

app.get("/api/health", (_, res) => {
  res.json({ status: "ok", service: "micro-journal-ai-backend" });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, model = "claude-3-sonnet-20240229", max_tokens = 512 } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid input: 'prompt' must be a string." });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return res.status(502).json({ error: "Anthropic upstream error", details: errText });
    }

    const result = await response.json();
    if (result.content && result.content[0] && result.content[0].text) {
      result.content[0].text = result.content[0].text.replace(/\\n/g, '\n');
    }
    res.json({ provider: "anthropic", result });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve static frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ AI Proxy running on http://localhost:${PORT}`));