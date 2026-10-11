# RadHanyu Desktop Widget

> **Minimalist, ambient desktop widget for passive Chinese language acquisition.**

RadHanyu rests unobtrusively in the corner of your desktop as a floating glass pill. It eliminates the cognitive overhead of active flashcard drilling by letting you absorb characters throughout your workday.

---

## ✨ Key Features

- **Ambient Glassmorphism**: Frameless, transparent floating pill (`290 × 86 px`) that remains pinned on top without stealing focus or cluttering the taskbar.
- **Two-State Model**:
  - **State A (Idle Pill)**: Target Hanzi, Pinyin with tone marks, HSK level badge.
  - **State B (Expanded Card)**: Deep definition, radical breakdown & mnemonics, native context sentence, pinyin, and English translation.
- **100% Offline**: Runs on local JSON datasets and native Windows Speech Synthesis (`zh-CN` voice profile). Zero internet required.
- **Persistent Cadence Scheduler**: Rotates words every hour (or daily). Remembers your position across PC sleep/restart cycles.
- **Manual Advance**: Double-click the idle pill anytime to immediately flip to the next word.

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed:

```powershell
# Navigate into the project
cd C:\mycode\RadHanyu

# Install dependencies (Electron)
npm install

# Launch the widget
npm start
```

---

## 📁 Project Architecture

For AI agents and developers, see [`AGENTS.md`](./AGENTS.md) and [`task.md`](./task.md) for full architectural guidelines.
