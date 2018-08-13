class CacheManager {
  constructor() {
    this._store = {};
  }

  isEmpty(cacheId, key) {
    return this._store.hasOwnProperty(cacheId)
      && this._store[cacheId].hasOwnProperty(key)
  }

  modifyCache(cacheId, key, value) {
    return new Promise((resolve, reject) => {
      this._store.hasOwnProperty(cacheId) ?
        this._store[cacheId][key] = value
        : this._store[cacheId] = {};
      resolve(value);
    });
  }

  find(cacheId, key) {
    return new Promise((resolve, reject) => {
      const result = this._store[cacheId] && this._store[cacheId][key];
      resolve(result);
    });
  }

  deleteCache(cacheId, value) {
    return new Promise((resolve, reject) => {
      this._store[cacheId] = {};
      resolve(value);
    })
  }

  deleteRecord(cacheId, key) {
    return new Promise((resolve, reject) => {
      const result = this._store[cacheId][key] = null;
      resolve(result ? 1 : 0);
    });
  }
}

module.exports = CacheManager;
