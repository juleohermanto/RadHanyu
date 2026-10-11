# RadHanyu - Project Tasks & Architecture Specification

RadHanyu is a zero-friction, minimalist desktop widget for passive Chinese language acquisition.
It runs as a frameless, transparent, floating glass pill pinned to the desktop without stealing focus.

---

## 🎯 Architecture Summary

- **Runtime**: Electron (Frameless, transparent, `alwaysOnTop: true`, `skipTaskbar: true`).
- **Mode**: 100% Offline (Local JSON dictionary, offline speech synthesis, persistent scheduler).
- **Interface States**:
  - **State A (Idle Pill - ~280 × 80 px)**: Target Hanzi, Pinyin with tone marks, HSK badge, drag anchor.
  - **State B (Expanded Detail - ~280 × 260 px)**: Definition, radical decomposition, example sentence, English translation, audio pronunciation button.

---

## 📋 Task List & Roadmap

### Phase 1: Foundation & Scaffold
- [x] Create `package.json` with Electron dependency and start scripts.
- [x] Create `main.js` (Frameless window controller, transparent window, IPC bridge).
- [x] Create `preload.js` (Secure bridge for window drag, collapse/expand toggle, audio triggers).
- [x] Create `README.md` and `AGENTS.md` (Project onboarding guidelines for external AI agents).

### Phase 2: Core Data & Audio Pipeline
- [x] Create `data/vocabulary.json` structured according to schema:
  - Official Hanban HSK 4 (598 words), HSK 5 (1,298 words), HSK 6 (2,500 words).
  - Radical decomposition & pinyin transcriptions.
  - English definitions and part of speech.
- [x] Implement Speech Synthesis Subsystem (Offline Web Speech API `zh-CN` voice profile).

### Phase 3: UI & Interaction Layer
- [x] Build `src/index.html` (Idle Pill & Expanded Inspector markup).
- [x] Build `src/styles.css` (Deep charcoal `#0e0e10`, frosted glass blur, jade emerald accents `#10b981`, snappy 220ms transitions).
- [x] Build `src/renderer.js` (State transitions: Idle $\leftrightarrow$ Expanded, outside-click auto-collapse, drag events).

### Phase 4: Cadence & Persistence Engine
- [x] Implement `src/scheduler.js`:
  - 30m / 1h / 4h / 24h cadence selector.
  - HSK Level filter (HSK 4, 5, 6, All).
  - `localStorage` timestamp persistence (sleep/restart safe).
  - Double-click to manually advance word.

### Phase 5: Verification & Polish
- [x] Electron v33 installed and verified.
- [x] Ready for desktop launch.
