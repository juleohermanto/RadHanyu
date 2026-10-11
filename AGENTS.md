# AGENTS.md - RadHanyu

This document guides any AI agent (Antigravity, Kiro CLI, Claude Code, Cursor, Aider, etc.) working on this repository.

## Project Overview
**RadHanyu** is an offline, minimalist desktop widget built with **Electron** for passive Chinese vocabulary acquisition. It renders as an ambient floating glass pill pinned to the user's desktop.

## Directory Structure
```
RadHanyu/
├── data/
│   └── vocabulary.json      # Structured offline dictionary (HSK, radicals, sentences)
├── src/
│   ├── index.html           # UI structure (State A: Idle Pill, State B: Expanded Card)
│   ├── styles.css           # Glassmorphism, deep charcoal palette, jade accents
│   ├── renderer.js          # UI controller, audio triggers, outside-click collapse
│   └── scheduler.js         # Cadence manager & localStorage persistence
├── main.js                  # Electron main process (frameless transparent window)
├── preload.js               # IPC bridge between Electron and webview
├── package.json             # NPM dependencies and scripts
└── task.md                  # Roadmap & task checklist
```

## Key Technical Requirements
1. **Window Host**:
   - `frame: false`, `transparent: true`, `alwaysOnTop: true`, `skipTaskbar: true`.
   - Smooth height transition between collapsed (280x80) and expanded (280x260) states.
2. **Offline Only**:
   - No external API calls for dictionaries or speech. Use native `window.speechSynthesis` (`zh-CN` voice) and local `vocabulary.json`.
3. **Design Aesthetic**:
   - Surface: `#0e0e10` with 88% opacity alpha mask.
   - Glassmorphism: `backdrop-filter: blur(16px)`.
   - Accents: Jade emerald `#10b981` / `#34d399`.
   - Typography: Clean white `#f9fafb` for Hanzi, slate `#9ca3af` for Pinyin.

## Running the Application
```powershell
npm install
npm start
```
