# Graph Report - .  (2026-04-25)

## Corpus Check
- Corpus is ~6,044 words - fits in a single context window. You may not need a graph.

## Summary
- 75 nodes · 64 edges · 24 communities detected
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Overview & Stack|Project Overview & Stack]]
- [[_COMMUNITY_App Composition & API|App Composition & API]]
- [[_COMMUNITY_Social Icons Sprite|Social Icons Sprite]]
- [[_COMMUNITY_Nifty Live Price Proxy|Nifty Live Price Proxy]]
- [[_COMMUNITY_Signals Table|Signals Table]]
- [[_COMMUNITY_Top Bar & Market Clock|Top Bar & Market Clock]]
- [[_COMMUNITY_Sector Heatmap|Sector Heatmap]]
- [[_COMMUNITY_Top Pick Card|Top Pick Card]]
- [[_COMMUNITY_Favicon & Brand|Favicon & Brand]]
- [[_COMMUNITY_Hero Image Assets|Hero Image Assets]]
- [[_COMMUNITY_App Root|App Root]]
- [[_COMMUNITY_Chat Panel|Chat Panel]]
- [[_COMMUNITY_Metrics Component|Metrics Component]]
- [[_COMMUNITY_Signals Data Hook|Signals Data Hook]]
- [[_COMMUNITY_Dark Theme Styling|Dark Theme Styling]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_Nifty Edge Function File|Nifty Edge Function File]]
- [[_COMMUNITY_Main Entry|Main Entry]]
- [[_COMMUNITY_HTTP Client|HTTP Client]]
- [[_COMMUNITY_Vite Config (alt)|Vite Config (alt)]]
- [[_COMMUNITY_Package Manifest|Package Manifest]]
- [[_COMMUNITY_React Logo|React Logo]]
- [[_COMMUNITY_Vite Logo|Vite Logo]]

## God Nodes (most connected - your core abstractions)
1. `NiftyEdge` - 12 edges
2. `App.jsx` - 7 edges
3. `icons.svg (SVG Sprite Sheet)` - 6 edges
4. `GET /signals` - 5 edges
5. `netlify/edge-functions/nifty.js` - 4 edges
6. `TopBar()` - 3 edges
7. `Live Nifty 50 Ticker` - 3 edges
8. `bluesky-icon (Bluesky social logo)` - 3 edges
9. `discord-icon (Discord social logo)` - 3 edges
10. `getIST()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `App.jsx` --references--> `TopBar.jsx`  [INFERRED]
  README.md → README.md  _Bridges community 1 → community 3_
- `NiftyEdge` --references--> `Live Nifty 50 Ticker`  [EXTRACTED]
  README.md → README.md  _Bridges community 0 → community 3_

## Hyperedges (group relationships)
- **Three-column dashboard composition** — readme_app_jsx, readme_signalstable_cmp, readme_toppick_cmp, readme_sectorheatmap_cmp, readme_chatpanel_cmp, readme_metrics_cmp [EXTRACTED 1.00]
- **Signals data flow from backend to UI** — readme_signals_endpoint, readme_usesignals_hook, readme_signalstable_cmp, readme_toppick_cmp, readme_sectorheatmap_cmp, readme_metrics_cmp [INFERRED 0.85]
- **Live Nifty price proxy chain** — readme_topbar, readme_edge_nifty_js, readme_netlify_toml, readme_yahoo_finance [EXTRACTED 1.00]

## Communities

### Community 0 - "Project Overview & Stack"
Cohesion: 0.2
Nodes (11): AI Analyst Chat, FastAPI on Railway, Netlify (static + Edge Functions), NiftyEdge, Portfolio Metrics, React 19, public/_redirects, Sector Heatmap (+3 more)

### Community 1 - "App Composition & API"
Cohesion: 0.27
Nodes (10): App.jsx, POST /chat, ChatPanel.jsx, main.jsx, Metrics.jsx, SectorHeatmap.jsx, GET /signals, SignalsTable.jsx (+2 more)

### Community 2 - "Social Icons Sprite"
Cohesion: 0.48
Nodes (7): bluesky-icon (Bluesky social logo), discord-icon (Discord social logo), documentation-icon (Documentation/docs glyph, purple outline), github-icon (GitHub logo), social-icon (Person with star/community glyph, purple outline), icons.svg (SVG Sprite Sheet), x-icon (X/Twitter social logo)

### Community 3 - "Nifty Live Price Proxy"
Cohesion: 0.33
Nodes (6): Edge function avoids CORS, netlify/edge-functions/nifty.js, netlify.toml, Live Nifty 50 Ticker, TopBar.jsx, Yahoo Finance

### Community 4 - "Signals Table"
Cohesion: 0.4
Nodes (0): 

### Community 5 - "Top Bar & Market Clock"
Cohesion: 0.6
Nodes (3): getIST(), TopBar(), useNiftyPrice()

### Community 6 - "Sector Heatmap"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "Top Pick Card"
Cohesion: 0.67
Nodes (0): 

### Community 8 - "Favicon & Brand"
Cohesion: 0.67
Nodes (3): NiftyEdge Favicon, Purple Brand Color (#863bff), Stylized Z Shape Logo

### Community 9 - "Hero Image Assets"
Cohesion: 0.67
Nodes (3): Hero Image - Isometric Stacked Cubes, Landing Page Hero Banner, Isometric 3D Cube Illustration (Purple)

### Community 10 - "App Root"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Chat Panel"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Metrics Component"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Signals Data Hook"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Dark Theme Styling"
Cohesion: 1.0
Nodes (2): Dracula-inspired dark theme, index.css

### Community 15 - "ESLint Config"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Nifty Edge Function File"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Main Entry"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "HTTP Client"
Cohesion: 1.0
Nodes (1): Axios + fetch

### Community 20 - "Vite Config (alt)"
Cohesion: 1.0
Nodes (1): vite.config.js

### Community 21 - "Package Manifest"
Cohesion: 1.0
Nodes (1): package.json

### Community 22 - "React Logo"
Cohesion: 1.0
Nodes (1): React Logo

### Community 23 - "Vite Logo"
Cohesion: 1.0
Nodes (1): Vite Logo

## Knowledge Gaps
- **24 isolated node(s):** `Sector Heatmap`, `Portfolio Metrics`, `AI Analyst Chat`, `React 19`, `Vite 8` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `App Root`** (2 nodes): `App()`, `App.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Chat Panel`** (2 nodes): `ChatPanel()`, `ChatPanel.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Metrics Component`** (2 nodes): `Metrics()`, `Metrics.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Signals Data Hook`** (2 nodes): `useSignals.jsx`, `useSignals()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dark Theme Styling`** (2 nodes): `Dracula-inspired dark theme`, `index.css`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Nifty Edge Function File`** (1 nodes): `nifty.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Main Entry`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `HTTP Client`** (1 nodes): `Axios + fetch`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config (alt)`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Package Manifest`** (1 nodes): `package.json`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Logo`** (1 nodes): `React Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Logo`** (1 nodes): `Vite Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `NiftyEdge` connect `Project Overview & Stack` to `Nifty Live Price Proxy`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `Live Nifty 50 Ticker` connect `Nifty Live Price Proxy` to `Project Overview & Stack`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `App.jsx` connect `App Composition & API` to `Nifty Live Price Proxy`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `App.jsx` (e.g. with `TopBar.jsx` and `Metrics.jsx`) actually correct?**
  _`App.jsx` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `GET /signals` (e.g. with `SignalsTable.jsx` and `TopPick.jsx`) actually correct?**
  _`GET /signals` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Sector Heatmap`, `Portfolio Metrics`, `AI Analyst Chat` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._