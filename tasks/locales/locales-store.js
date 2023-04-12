class LocalesStore {
  constructor() {
    this.store = {};
  }

  add(key, value) {
    this.store[key] = value;
  }

  get() {
    return this.store;
  }
}

module.exports = new LocalesStore();
