# NiftyEdge

A real-time trading signals dashboard for the Nifty 50, built with React and Vite. NiftyEdge surfaces ranked setups, sector momentum, and an analyst chat panel into a single three-column dashboard.

![Status](https://img.shields.io/badge/status-active-00d4a0)
![React](https://img.shields.io/badge/React-19-50fa7b)
![Vite](https://img.shields.io/badge/Vite-8-bd93f9)

## Overview

NiftyEdge is the frontend for a signals engine that scores Nifty 50 constituents on momentum, volume, and confirmation criteria. The UI presents:

- **Signals Table** — ranked list of actionable setups with key metrics
- **Top Pick** — highest-conviction trade idea of the session
- **Sector Heatmap** — cluster momentum across sectors (hot / warm / cool)
- **Portfolio Metrics** — aggregate counts and breakdowns
- **Analyst Chat** — context-aware chat grounded in the current signal set
- **Live Nifty 50 ticker** — streamed via a Netlify Edge Function proxying Yahoo Finance

The theme is a Dracula-inspired dark palette with an emerald accent.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| HTTP | Axios + native `fetch` |
| Hosting | Netlify (static + Edge Functions) |
| Backend (separate repo) | FastAPI on Railway |
| Data source | Yahoo Finance (Nifty 50 quote) |

## Project Structure

```
├── public/                 # Static assets (favicon, icon sprite)
├── netlify/
│   └── edge-functions/
│       └── nifty.js        # /api/nifty — Yahoo Finance proxy
├── src/
│   ├── App.jsx             # Three-column dashboard shell
│   ├── App.css
│   ├── main.jsx            # React entry point
│   ├── index.css           # Global theme tokens (CSS variables)
│   ├── hooks/
│   │   ├── useSignals.jsx  # Fetches /signals from backend
│   │   └── useCountUp.js   # Animated number counter
│   └── components/
│       ├── TopBar.jsx      # Header + live Nifty price + refresh
│       ├── Metrics.jsx     # Aggregate signal stats
│       ├── TopPick.jsx     # Headline trade idea
│       ├── SignalsTable.jsx
│       ├── SectorHeatmap.jsx
│       └── ChatPanel.jsx   # Analyst chat panel
├── netlify.toml
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running NiftyEdge backend exposing `/signals` and `/chat` (see **Backend** below)

### Install & run

```bash
npm install
npm run dev
```

The app boots at `http://localhost:5173` and calls the backend at `http://127.0.0.1:8000` by default.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Configuration

### Backend endpoint

The backend URL is currently hardcoded in [src/hooks/useSignals.jsx](src/hooks/useSignals.jsx#L4):

```js
const API = 'http://127.0.0.1:8000'
```

The chat endpoint is hardcoded in [src/components/ChatPanel.jsx](src/components/ChatPanel.jsx#L39) (Railway production URL). Update these to point at your own backend deployment.

### Netlify Edge Function

[netlify/edge-functions/nifty.js](netlify/edge-functions/nifty.js) proxies Yahoo Finance so the live Nifty 50 price can be fetched from the browser without CORS issues. Routed via `netlify.toml`:

```toml
[[edge_functions]]
  path = "/api/nifty"
  function = "nifty"
```

## Backend API contract

The dashboard expects two endpoints:

**`GET /signals`** → `Signal[]`

Each signal drives the table, top pick, sector heatmap, and metrics. Fields consumed by the UI include ticker, sector, score, momentum, volume confirmation, and entry/stop levels.

**`POST /chat`** → `{ response: string }`

Request body:
```json
{
  "message": "Rank the top 3 setups today",
  "signals": [ /* current signals array */ ],
  "history": [ { "role": "user" | "assistant", "content": "..." } ]
}
```

The backend is a separate FastAPI service — point `API` and the chat URL at your own deployment.

## Theming

All colors are centralized as CSS custom properties in [src/index.css](src/index.css). To reskin the app, edit the `:root` block — the current palette is Dracula-based:

| Token | Value | Role |
|---|---|---|
| `--bg` | `#282a36` | App background |
| `--surface` / `--surface2` / `--surface3` | `#343746` / `#3d4051` / `#44475a` | Card layers |
| `--text` / `--text2` / `--text3` | `#f8f8f2` / `#bfbfd4` / `#6272a4` | Text tiers |
| `--accent` | `#00d4a0` | Interactive accent (emerald) |
| `--green` | `#50fa7b` | Bullish / up |
| `--red` | `#ff5555` | Bearish / down |
| `--amber` | `#ffb86c` | Neutral / caution |

## Deployment

The app is configured for Netlify:

1. Push to a Git provider connected to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. SPA routing and the `/api/nifty` edge function are handled by [netlify.toml](netlify.toml) and [public/_redirects](public/_redirects).

## License

Private project. All rights reserved unless a license file is added.
