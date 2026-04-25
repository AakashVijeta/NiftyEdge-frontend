# NiftyEdge Redesign — "Terminal Pro"

**Date:** 2026-04-25  
**Status:** Approved  
**Goal:** Redesign NiftyEdge to look professional, trustworthy, and public-facing. Portfolio project with future public launch in mind.

---

## 1. Color System

```css
--bg:           #070b14
--surface:      #0d1425
--surface2:     #111d35
--surface3:     #1a2744
--divider:      rgba(59,130,246,0.10)

--text:         #f0f4ff
--text2:        #8899bb
--text3:        #4a5d82

--accent:       #3b82f6
--accent-light: #60a5fa
--accent-dim:   rgba(59,130,246,0.12)
--accent-glow:  rgba(59,130,246,0.25)
--accent-border:rgba(59,130,246,0.20)

--green:        #22d3a0
--green-bg:     rgba(34,211,160,0.12)
--green-border: rgba(34,211,160,0.25)
--red:          #f43f5e
--red-bg:       rgba(244,63,94,0.12)
--red-border:   rgba(244,63,94,0.25)
--amber:        #f59e0b
--amber-bg:     rgba(245,158,11,0.12)
--amber-border: rgba(245,158,11,0.25)
```

---

## 2. Typography

- **Body/UI:** `Inter` (replaces DM Sans) — Google Fonts, weights 300/400/500/600/700
- **Data/Numbers:** `JetBrains Mono` (replaces DM Mono) — Google Fonts, weights 300/400/500

Card style:
- `background: var(--surface)`
- `border: 1px solid var(--divider)`
- `border-radius: 12px`
- `box-shadow: 0 4px 24px rgba(0,0,0,0.4)`

Accent card style (Top Pick):
- `box-shadow: 0 0 0 1px var(--accent-border), 0 4px 32px rgba(59,130,246,0.12)`

---

## 3. TopBar

**Structure (left → right):**
- Brand: "Nifty" (`--text`) + "Edge" (`--accent`), Inter 700 `1.6rem`
- Tagline: "Swing Signal System" — uppercase `--text3`, separated by thin vertical divider
- Right cluster:
  1. Market status chip: `● MARKET OPEN` (green) or `● MARKET CLOSED` (muted) — pill with colored border
  2. NIFTY 50 block: label + price (JetBrains Mono) + change/pct (green/red)
  3. Vertical divider
  4. IST Clock — JetBrains Mono, `--text2`
  5. Refresh button — `↻ Refresh`, blue accent border

**Sticky behavior:**
- `position: sticky; top: 0; z-index: 100`
- `backdrop-filter: blur(12px)`
- `background: rgba(7,11,20,0.85)`
- `border-bottom: 1px solid var(--divider)`
- `box-shadow: 0 1px 0 rgba(59,130,246,0.15)`

The separate `.topbar-line` div is removed; border-bottom on topbar replaces it.

---

## 4. Layout — 2-Column Grid

```
┌─────────────────────────────┬──────────────────────┐
│  Left column (65%)          │  Right column (35%)  │
│  ─────────────────          │  ──────────────────  │
│  Metrics strip (3 KPIs)     │  Top Pick card       │
│  Signals Table              │  Sector Heatmap      │
└─────────────────────────────┴──────────────────────┘
```

- Grid: `grid-template-columns: 1fr minmax(0, 400px)`
- Gap: `20px`
- Cards within columns: `16px` gap
- Chat removed from grid — becomes a drawer (see Section 5)

**Responsive breakpoints:**
- `< 1100px`: Right column `320px` fixed, left takes remaining
- `< 860px`: Single column, right stacks below left
- `< 600px`: Metrics goes 2-col (2+1), everything stacks

---

## 5. Chat Drawer

**Trigger button (floating):**
- `position: fixed; right: 0; top: 50%; transform: translateY(-50%)`
- Label: `AI ↗`, `--accent` color
- `background: var(--surface2)`, `border: 1px solid var(--accent-border)`
- Left-side border-radius only (visually attached to viewport edge)
- Hover: `box-shadow: -4px 0 16px var(--accent-glow)`

**Drawer panel:**
- `position: fixed; right: 0; top: 0; height: 100vh; width: 380px; z-index: 200`
- Opens: `transform: translateX(0)`, Closed: `transform: translateX(100%)`
- `transition: transform 0.3s cubic-bezier(0.4,0,0.2,1)`
- `background: rgba(13,20,37,0.96); backdrop-filter: blur(16px)`
- `border-left: 1px solid var(--accent-border)`

**Backdrop:** `rgba(7,11,20,0.5)` overlay behind drawer. Click to close.

**Main layout:** Does NOT shift when drawer opens — drawer overlays it.

**Drawer header:** "AI Analyst" title + NiftyEdge badge left, `✕` close button right.

**Content:** Functionally identical to current ChatPanel — messages, suggestions, input row. Restyled to new palette only.

---

## 6. Component Polish

### Metrics Strip
- Compact cards: `padding: 1rem 1.25rem`, height ~90px
- `border-left: 3px solid var(--accent)` on each card
- Value: JetBrains Mono `1.8rem`, `--text`
- Label: `0.72rem` uppercase, `--text3`

### Signals Table
- Header: sticky within table scroll container, `background: var(--surface2)`
- Filter pills: `border-radius: 20px`. Active: `background: --accent-dim`, `border: 1px solid --accent-border`
- Row hover: `background: var(--surface2)`
- Row separator: `border-bottom: 1px solid var(--divider)`
- Confidence: JetBrains Mono, right-aligned, colored (green ≥70%, amber ≥55%, red below)
- RSI bar: rounded track, glowing fill matching `rsiColor`

### Top Pick Card
- Eyebrow "Top Pick": accent left-border treatment
- Ticker: Inter 700 `2rem`
- Confidence bar: `8px` height, rounded, blue glowing fill
- Stats grid: enforced `3×2` layout with clean dividers
- Action chips: `border-radius: 8px`, each with colored border (blue/green/red)

### Sector Heatmap
- Heat cells: left-border color coding (green/amber/red) instead of background tint
- Count badge: right-aligned pill

---

## 7. Files to Change

| File | Change |
|------|--------|
| `src/index.css` | Full palette + typography + layout update |
| `src/App.jsx` | 2-column grid, remove col-chat, add ChatDrawer |
| `src/App.css` | Remove (merge into index.css) or keep for app shell |
| `src/components/TopBar.jsx` | Market status chip, sticky header |
| `src/components/TopBar.css` | New styles |
| `src/components/Metrics.css` | Compact cards, accent left border |
| `src/components/SignalsTable.css` | Sticky header, pill filters, row hover |
| `src/components/TopPick.css` | More space, blue bar, refined chips |
| `src/components/SectorHeatmap.css` | Left-border heat cells |
| `src/components/ChatPanel.jsx` | Wrap in drawer, add trigger button + backdrop |
| `src/components/ChatPanel.css` | Drawer styles, new palette |
| `src/index.css` (font import) | Replace DM Sans/Mono with Inter/JetBrains Mono |
| `src/hooks/useCountUp.js` | New lightweight counter animation hook |

No new components needed. ChatPanel wraps itself in the drawer — the drawer trigger and overlay live inside ChatPanel.jsx.

---

## 8. Animations

### Entrance animations
- Replace existing `fadeUp` with a refined version: `opacity: 0 → 1` + `translateY(16px → 0)`, `duration: 0.45s`, `easing: cubic-bezier(0.4,0,0.2,1)`
- Stagger columns: left column animates first, right column delayed by `0.1s`
- Within left column: metrics cards stagger `0.07s` apart, signals table follows at `0.15s`
- Within right column: Top Pick at `0.1s`, Heatmap at `0.2s`
- TopBar items fade in on load with a `0.3s` delay (after layout is ready)

### Micro-interactions
- **Card hover lift:** `transform: translateY(-2px)`, `box-shadow` deepens, `transition: 0.2s ease`. Applied to metric cards, heat cells, Top Pick.
- **Button press:** `transform: scale(0.97)` on `active` state for Refresh, filter pills, Send, suggestion buttons.
- **Filter pill transition:** Active pill slides with a `background` crossfade `0.15s` — no layout jump.
- **Chat drawer:** Trigger button pulses subtly when chat has unread context (signals loaded). Drawer slide uses `cubic-bezier(0.4,0,0.2,1) 0.3s`.
- **Row hover:** Signals table row background transitions `0.15s ease`.

### Data animations
- **RSI bar fill:** Animates from `width: 0` to final value on mount, `duration: 0.6s`, `easing: ease-out`, `delay: 0.3s` (after card entrance).
- **Top Pick confidence bar:** Same treatment, `duration: 0.8s` — slightly slower as it's the hero element.
- **Number counters:** Signals Today, Avg Confidence, and Backtest Win Rate tick up from 0 to their final value on first render. Uses a lightweight `useCountUp` hook (no external library) — `duration: 1s`, `easing: ease-out`.
- **Nifty 50 price:** On initial load, fades in. On refresh/update, briefly flashes `--accent-glow` background to indicate new value.

### Implementation notes
- All animations use CSS keyframes + transitions where possible. JS only for the `useCountUp` hook and the Nifty price flash.
- `prefers-reduced-motion` media query wraps all animations — if user has reduced motion enabled, all animations are instant.

---

## 9. Out of Scope

- No functional changes to signal data, API calls, or hooks
- No new pages or routing
