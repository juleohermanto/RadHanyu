# RadHanyu Desktop Widget (v1.1)

> **Minimalist, ambient desktop widget for passive Chinese language acquisition.**

RadHanyu is a zero-friction, ambient desktop widget designed to help you absorb Chinese vocabulary effortlessly throughout your workday. It floats unobtrusively on your screen as a frosted-glass pill, eliminating the cognitive friction of active flashcard drilling.

---

## 🌟 What's New in v1.1

- **Full HSK 1–3 Vocabulary Support**: Added **HSK 1** (150 words), **HSK 2** (147 words), and **HSK 3** (298 words). The vocabulary database now totals **4,991 words** spanning HSK 1 through HSK 6.
- **Downward Expansion & Hitbox Fix**: Expanding now smoothly extends downward instead of pushing upward against the top screen barrier, allowing effortless placement anywhere along the top edge of your monitor.
- **Persistent Expanded Mode**: The expanded view stays open while you write, type, or switch between apps and browser tabs without collapsing. A header collapse button (`▲`) allows one-click tucking back into the idle pill.
- **Automatic System Startup**: Automatically launches upon computer boot/login.

---

## ✨ Features

- **Ambient Glassmorphism & Themes**: Frameless, transparent floating pill designed with modern frosted glass styling, smooth animations, and a one-click **Dark / Light theme toggle** (persisted in local storage).
- **Two-State Micro-Interaction**:
  - **State A (Idle Pill — 330 × 90 px)**: Displays target Hanzi, Pinyin with tone marks, and a one-click audio pronunciation button.
  - **State B (Expanded Inspector — 640 × 300+ px)**: Click anywhere on the pill to expand downward into a split two-column inspector showing:
    - Part of speech & comprehensive English definition.
    - Radical breakdown chips & character mnemonics.
    - Native context example sentences with Chinese glyphs, Pinyin, and English translations.
    - Previous and Next navigation buttons.
  - **Persistent Expanded Mode**: Stays expanded while you write, type, or switch between other applications/tabs. Click the ▲ collapse button in the header whenever you want to return to the idle pill.
- **Always-on-Top / Desktop Lock Pin**: Toggle the 📌 pin button to switch between floating on top of all application windows or resting quietly on the desktop behind active work.
- **Comprehensive HSK Level Filtering**: Switch instantly between **HSK 1**, **HSK 2**, **HSK 3**, **HSK 4**, **HSK 5**, **HSK 6**, or **All Levels**.
- **Auto-Launch on Startup**: Configured to boot up automatically when the laptop/PC powers on.
- **Custom Cadence Rotation**: Choose your word rotation schedule (**1m**, **5m**, **10m**, **30m**, **1h**, **4h**, or **24h**). State and timestamps persist across system reboots or sleep cycles.
- **Manual Advance & Quick Navigation**:
  - Double-click the idle pill anytime to immediately jump to the next word.
  - Use `← Prev` and `Next →` buttons in the expanded view to browse words manually.
- **100% Offline & Private**:
  - Operates completely offline with local dictionary datasets (`data/vocabulary.json`).
  - Native offline Speech Synthesis using the Windows `zh-CN` voice profile. Zero external API calls, tracking, or network overhead.

---

## 🚀 Getting Started

### Option 1: Standalone Windows App (Recommended for Users)
No Node.js or terminal required:
1. Download **`radhanyu Setup 1.1.0.exe`** from [Releases](https://github.com/juleohermanto/RadHanyu/releases).
2. Run the Setup Wizard to install the application.
3. Launch RadHanyu directly from your Desktop or Start Menu!

---

### Option 2: Running from Source (For Developers)

#### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- Windows 10 / 11 (tested with native speech synthesis)

#### Installation & Launch

```bash
# 1. Clone the repository
git clone https://github.com/juleohermanto/RadHanyu.git
cd RadHanyu

# 2. Install dependencies (Electron)
npm install

# 3. Launch in development mode
npm start
```

#### Build Independent Setup Wizard (`.exe`)

To package a standalone Windows installer yourself:

```bash
npx --yes electron-builder --win nsis
```
The resulting installer will be located in the `dist/` directory: `dist/radhanyu Setup 1.1.0.exe`.

> **Note for Offline Distribution**: RadHanyu operates **100% offline** without needing any active internet connection or external services. Both the developer build and standalone installer make zero remote calls.

---

## 🕹️ Controls & Interactions

| Action | Control |
| :--- | :--- |
| **Move Widget** | Click and drag `•••` handle |
| **Expand Card** | Single-click anywhere on the idle pill (expands downward) |
| **Collapse Card** | Click the `▲` collapse button in the header |
| **Pronounce Audio** | Click the 🔊 speaker button |
| **Next Word (Quick)** | Double-click the idle pill |
| **Browse Words** | Click `← Prev` or `Next →` in the expanded view |
| **Toggle Theme** | Click the 🌙 / ☀️ switch in the top header |
| **Toggle Always-on-Top** | Click the 📌 pin button |
| **Change Cadence** | Select rotation interval dropdown (`1m` to `24h`) |
| **Filter Level** | Select level dropdown (`HSK 1` through `HSK 6`, or `All Levels`) |
| **Close Application** | Click the `×` button |

---

## 📁 Project Architecture

```
RadHanyu/
├── data/
│   └── vocabulary.json      # Offline HSK 1-6 dictionary (4,991 words), radicals & examples
├── src/
│   ├── index.html           # Widget layout (Idle Pill & Expanded Inspector)
│   ├── styles.css           # Glassmorphism, downward animations, dark/light themes
│   ├── renderer.js          # Interactions, speech synthesis, theme & UI state logic
│   └── scheduler.js         # Cadence timing, randomizer, history, and persistence
├── main.js                  # Electron main process (frameless window, auto-launch, IPC)
├── preload.js               # Context-isolated IPC bridge
├── package.json             # NPM metadata and Electron dependencies (v1.1.0)
```

---

## 📄 License

This project is licensed under the [MIT License](package.json).
