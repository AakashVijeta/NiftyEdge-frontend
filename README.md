# 💎 NiftyEdge
### The Ultimate Swing Trading Command Center for Nifty 50

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Motion](https://img.shields.io/badge/Motion-12-ff0055?style=for-the-badge&logo=framer)](https://motion.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://www.netlify.com/)
[![Status](https://img.shields.io/badge/Status-Active-00d4a0?style=for-the-badge)](https://niftyedge.netlify.app)

</div>

---

## 🚀 Overview

**NiftyEdge** is a premium, real-time trading dashboard designed to surface high-probability swing trading setups within the Nifty 50 universe. It serves as the visual command center for a proprietary machine-learning engine, providing traders with institutional-grade data visualization and AI-powered technical analysis.

Built with a focus on **Information Density** and **Cinematic UX**, NiftyEdge transforms raw market data into actionable intelligence through a sleek, high-contrast terminal interface.

🌐 **Live Demo:** [niftyedge.netlify.app](https://niftyedge.netlify.app)

---

## ✨ Key Features

- **🎯 Actionable Signals** — A ranked list of setups with real-time confidence scores, RSI indicators, and volume confirmation.
- **🤖 AI Analyst (Liquid Metal)** — Integrated LLM-powered analyst with a custom "liquid metal" UI effect, providing context-aware trade commentary.
- **🔥 Sector Momentum Heatmap** — Visualize capital flow across key sectors (IT, Energy, Consumer, Auto, etc.) to identify broad market tailwinds.
- **💎 Spotlight Pick** — A dedicated high-conviction card featuring a granular breakdown of RSI, Volatility Ratios, and Bollinger Band positioning.
- **📊 Live Market Pulse** — Real-time tracking of Nifty 50 indexing, signal distribution, and aggregate model confidence.
- **📈 Backtest-Ready Logic** — Integrated win-rate metrics based on a consistent (2.5% TP / 1.0% SL) swing strategy.

---

## 🎨 Design Philosophy: Bloomberg Terminal Retro-Futurism

NiftyEdge utilizes a **Bloomberg Terminal** inspired aesthetic, optimized for high-density data processing and zero-distraction focus.

- **Visual Style:** Ultra-flat cards, sharp borders, and a responsive three-column grid layout.
- **Liquid UI:** The AI Analyst trigger features a "Liquid Metal" border effect that mimics flowing mercury with non-uniform thickness.
- **Typography:** **Inter** for UI clarity and **IBM Plex Mono** for a classic terminal feel.
- **Color Palette:** Near-Black (`#000000`) foundation with **Bloomberg Orange** (`#ff8c00`) highlights and high-contrast status markers.
- **Stabilized Motion:** Optimized interaction engine ensuring zero-flicker dimming and smooth GPU-accelerated state transitions.

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **React 19** | Modern, declarative UI architecture |
| **Styling** | **Vanilla CSS** | High-performance CSS variables and `@property` animations |
| **Motion** | **Framer Motion** | GPU-accelerated interactive UI states |
| **Build** | **Vite** | Lightning-fast HMR and optimized production bundling |
| **Serverless** | **Netlify Edge** | Performance-optimized API proxies and redirects |
| **API** | **FastAPI** | High-performance backend for ML signal serving |

---

## 📂 Project Structure

```text
├── src/
│   ├── components/       # UI Components (SignalsTable, ChatPanel, SpotlightCard, etc.)
│   ├── hooks/            # Logic (useSignals, useNiftyPrice, useCountUp)
│   ├── lib/              # Utilities (theme, utils)
│   ├── App.jsx           # Core dashboard layout shell
│   └── index.css         # Bloomberg-style design tokens and global styles
├── netlify/
│   └── edge-functions/   # Deno-based edge functions for data proxying
├── public/               # Static assets and Netlify redirects
└── docs/assets/          # Project documentation media
```

---

## 🚦 Getting Started

### 1. Prerequisites
- **Node.js 18+**
- **NiftyEdge API** (running locally or accessible via URL)

### 2. Installation
```bash
git clone https://github.com/AakashVijeta/NiftyEdge.git
cd NiftyEdge
npm install
```

### 3. Development
```bash
npm run dev
```

### 4. Production Build
```bash
npm run build
```

---

## 📈 Data Pipeline

The frontend acts as the final consumer of the NiftyEdge intelligence pipeline:
1. **Ingestion:** Backend fetches OHLCV data from market providers.
2. **Analysis:** ML Engine (XGBoost) computes technical features and generates signal probabilities.
3. **Delivery:** FastAPI serves these signals via a secure endpoint.
4. **Visualization:** NiftyEdge UI renders the data into the actionable dashboard.

---

## ⚠️ Disclaimer
NiftyEdge is an educational research tool. Signals are probabilistic outputs from a machine learning model and do **not** constitute financial advice. Trading involves significant risk. Always perform your own due diligence before making investment decisions.

