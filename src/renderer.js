let isExpanded = false;
let vocabulary = [];
let scheduler = null;

const widgetContainer = document.getElementById('widget-container');
const idleView = document.getElementById('idle-view');
const expandedView = document.getElementById('expanded-view');
const closeBtn = document.getElementById('close-btn');
const audioBtn = document.getElementById('audio-btn');

const levelBadge = document.getElementById('level-badge');
const hanziGlyph = document.getElementById('hanzi-glyph');
const pinyinText = document.getElementById('pinyin-text');
const posTag = document.getElementById('pos-tag');
const definitionText = document.getElementById('definition-text');
const radicalsList = document.getElementById('radicals-list');
const mnemonicText = document.getElementById('mnemonic-text');
const exampleZh = document.getElementById('example-zh');
const examplePinyin = document.getElementById('example-pinyin');
const exampleEn = document.getElementById('example-en');

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.85;

  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('cmn'));
  if (zhVoice) utterance.voice = zhVoice;

  window.speechSynthesis.speak(utterance);
}

function renderWord(word) {
  if (!word) return;
  if (levelBadge) levelBadge.textContent = word.level;
  if (hanziGlyph) hanziGlyph.textContent = word.hanzi;
  if (pinyinText) pinyinText.textContent = word.pinyin;
  if (posTag) posTag.textContent = word.part_of_speech;
  if (definitionText) definitionText.textContent = word.definition;

  radicalsList.innerHTML = '';
  if (word.radicals && word.radicals.length > 0) {
    word.radicals.forEach(r => {
      const chip = document.createElement('div');
      chip.className = 'radical-chip';
      
      const strong = document.createElement('strong');
      strong.textContent = r.radical || '';
      const span = document.createElement('span');
      span.textContent = ` ${r.meaning || ''}`;

      chip.appendChild(strong);
      chip.appendChild(span);
      radicalsList.appendChild(chip);
    });
  }
  mnemonicText.textContent = word.mnemonic ? `Mnemonic: ${word.mnemonic}` : '';

  exampleZh.textContent = word.example_zh || '';
  examplePinyin.textContent = word.example_pinyin || '';
  exampleEn.textContent = word.example_en || '';
}

function toggleExpand(forceState) {
  isExpanded = forceState !== undefined ? forceState : !isExpanded;

  if (isExpanded) {
    if (widgetContainer) widgetContainer.classList.add('widget-expanded');
    expandedView.classList.remove('hidden');
    requestAnimationFrame(() => {
      const neededHeight = widgetContainer ? widgetContainer.scrollHeight + 12 : 280;
      if (window.electronAPI) window.electronAPI.resizeWidget(true, neededHeight);
    });
  } else {
    if (widgetContainer) widgetContainer.classList.remove('widget-expanded');
    expandedView.classList.add('hidden');
    if (window.electronAPI) window.electronAPI.resizeWidget(false);
  }
}

let clickTimeout = null;

idleView.addEventListener('click', (e) => {
  if (e.target.closest('#audio-btn') || e.target.id === 'audio-btn') return;
  
  if (clickTimeout) clearTimeout(clickTimeout);
  clickTimeout = setTimeout(() => {
    toggleExpand(true);
  }, 220);
});

idleView.addEventListener('dblclick', (e) => {
  if (e.target.closest('#audio-btn') || e.target.id === 'audio-btn') return;
  if (clickTimeout) clearTimeout(clickTimeout);
  if (scheduler) {
    const next = scheduler.nextWord();
    renderWord(next);
  }
});

expandedView.addEventListener('click', (e) => {

  if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
    toggleExpand(false);
  }
});

audioBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const currentWord = scheduler ? scheduler.getCurrentWord() : null;
  if (currentWord) speak(currentWord.hanzi);
});

const prevWordBtn = document.getElementById('prev-word-btn');
if (prevWordBtn) {
  prevWordBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (scheduler) {
      const prev = scheduler.previousWord();
      renderWord(prev);
      if (isExpanded) {
        requestAnimationFrame(() => {
          const neededHeight = widgetContainer ? widgetContainer.scrollHeight + 14 : 300;
          if (window.electronAPI) window.electronAPI.resizeWidget(true, neededHeight);
        });
      }
    }
  });
}

const nextWordBtn = document.getElementById('next-word-btn');
if (nextWordBtn) {
  nextWordBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (scheduler) {
      const next = scheduler.nextWord();
      renderWord(next);
      if (isExpanded) {
        requestAnimationFrame(() => {
          const neededHeight = widgetContainer ? widgetContainer.scrollHeight + 14 : 300;
          if (window.electronAPI) window.electronAPI.resizeWidget(true, neededHeight);
        });
      }
    }
  });
}

closeBtn.addEventListener('click', () => {
  if (window.electronAPI) window.electronAPI.closeWidget();
});

if (window.electronAPI) {
  window.electronAPI.onAutoCollapse(() => {
    if (isExpanded) toggleExpand(false);
  });
}

const cadenceSelect = document.getElementById('cadence-select');
const levelSelect = document.getElementById('level-select');
const themeSwitch = document.getElementById('theme-switch');
const pinBtn = document.getElementById('pin-btn');

let isLightTheme = localStorage.getItem('radhanyu_theme') === 'light';
function updateThemeUI() {
  if (isLightTheme) {
    document.body.classList.add('theme-light');
  } else {
    document.body.classList.remove('theme-light');
  }
}
updateThemeUI();

if (themeSwitch) {
  themeSwitch.addEventListener('click', (e) => {
    e.stopPropagation();
    isLightTheme = !isLightTheme;
    localStorage.setItem('radhanyu_theme', isLightTheme ? 'light' : 'dark');
    updateThemeUI();
  });
}

if (pinBtn && window.electronAPI) {
  pinBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.electronAPI.togglePin();
  });

  window.electronAPI.onPinStatus((isPinned) => {
    if (isPinned) {
      pinBtn.classList.add('active');
      pinBtn.title = 'Pinned (Always on top)';
    } else {
      pinBtn.classList.remove('active');
      pinBtn.title = 'Unpinned (Attached to desktop)';
    }
  });
}

if (cadenceSelect) {
  cadenceSelect.addEventListener('change', (e) => {
    const newCadence = parseInt(e.target.value, 10);
    if (scheduler) {
      scheduler.setCadence(newCadence);
    }
  });
}

if (levelSelect) {
  levelSelect.addEventListener('change', (e) => {
    const selectedLevel = e.target.value;
    if (scheduler) {
      const word = scheduler.setLevelFilter(selectedLevel);
      renderWord(word);
    }
  });
}

async function init() {
  try {
    const response = await fetch('../data/vocabulary.json');
    vocabulary = await response.json();
    scheduler = new CadenceScheduler(vocabulary);
    

    if (cadenceSelect) {
      cadenceSelect.value = scheduler.intervalMs.toString();
    }
    if (levelSelect) {
      levelSelect.value = scheduler.currentLevel;
    }

    scheduler.onWordChange = (word) => {
      renderWord(word);
    };

    renderWord(scheduler.getCurrentWord());
  } catch (err) {
    console.error('Failed to load vocabulary data:', err);
  }
}

init();
