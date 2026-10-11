class CadenceScheduler {
  constructor(dataset, intervalMs = 3600000) {
    this.dataset = dataset;
    this.intervalMs = intervalMs;
    this.currentIndex = 0;
    this.storageKeyIndex = 'radhanyu_current_index';
    this.storageKeyLevel = 'radhanyu_level_filter';
    this.storageKeyCadence = 'radhanyu_cadence';
    this.storageKeyTimestamp = 'radhanyu_timestamp';
    this.currentLevel = localStorage.getItem(this.storageKeyLevel) || 'HSK 4';
    this.applyFilter();

    this.history = [];

    const savedCadence = localStorage.getItem(this.storageKeyCadence);
    if (savedCadence) {
      this.intervalMs = parseInt(savedCadence, 10);
    }

    this.init();
  }

  applyFilter() {
    if (this.currentLevel === 'ALL') {
      this.filteredDataset = [...this.dataset];
    } else {
      this.filteredDataset = this.dataset.filter(item => item.level === this.currentLevel);
    }
    if (this.filteredDataset.length === 0) {
      this.filteredDataset = [...this.dataset];
    }
    this.history = [];
    this.currentIndex = 0;
  }

  setLevelFilter(level) {
    this.currentLevel = level;
    localStorage.setItem(this.storageKeyLevel, level);
    this.applyFilter();

    this.pickRandomWord();
    this.startTimer();
    return this.getCurrentWord();
  }

  init() {

    this.pickRandomWord();
    this.startTimer();
  }

  pickRandomWord() {
    if (this.filteredDataset && this.filteredDataset.length > 0) {
      this.currentIndex = Math.floor(Math.random() * this.filteredDataset.length);
      localStorage.setItem(this.storageKeyIndex, this.currentIndex.toString());
      localStorage.setItem(this.storageKeyTimestamp, Date.now().toString());
    }
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    localStorage.setItem(this.storageKeyShuffle, this.isShuffled.toString());
    return this.isShuffled;
  }

  startTimer() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.nextWord();
      if (this.onWordChange) this.onWordChange(this.getCurrentWord());
    }, this.intervalMs);
  }

  setCadence(newIntervalMs) {
    this.intervalMs = newIntervalMs;
    localStorage.setItem(this.storageKeyCadence, newIntervalMs.toString());
    this.startTimer();
  }

  getCurrentWord() {
    return this.filteredDataset[this.currentIndex] || this.filteredDataset[0];
  }

  previousWord() {
    if (this.history.length > 0) {
      this.currentIndex = this.history.pop();
    } else {

      this.currentIndex = (this.currentIndex - 1 + this.filteredDataset.length) % this.filteredDataset.length;
    }
    localStorage.setItem(this.storageKeyIndex, this.currentIndex.toString());
    localStorage.setItem(this.storageKeyTimestamp, Date.now().toString());
    return this.getCurrentWord();
  }

  nextWord() {

    this.history.push(this.currentIndex);
    if (this.history.length > 50) this.history.shift();

    if (this.filteredDataset.length > 1) {
      let nextIdx = Math.floor(Math.random() * this.filteredDataset.length);
      if (nextIdx === this.currentIndex) {
        nextIdx = (nextIdx + 1) % this.filteredDataset.length;
      }
      this.currentIndex = nextIdx;
    } else {
      this.currentIndex = 0;
    }
    localStorage.setItem(this.storageKeyIndex, this.currentIndex.toString());
    localStorage.setItem(this.storageKeyTimestamp, Date.now().toString());
    return this.getCurrentWord();
  }
}
