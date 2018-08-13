const CACHE_ID = 'books';
const FIND_CACHE_ID = 'books_find';

class LibraryService {
  constructor(libRepository, cacheManager) {
    this._libRepository = libRepository;
    this._cacheManager = cacheManager;
  }

  addBook(title, author) {
    return this._libRepository.addBook(title, author)
      .then(data => this._cacheManager.modifyCache(CACHE_ID, data.id, data))
      .then(data => this._cacheManager.deleteCache(FIND_CACHE_ID, data));
  }

  find(title, author, page, pageSize, sort) {
    const key = `${title};${author};${page};${pageSize}`;

    if (this._cacheManager.isEmpty(FIND_CACHE_ID, key)) {
      return this._cacheManager.find(FIND_CACHE_ID, key);
    } else {
      return this._libRepository.find(title, author, page, pageSize, sort)
        .then(data => this._cacheManager.modifyCache(FIND_CACHE_ID, key, data))
        .then(() => this._cacheManager.find(FIND_CACHE_ID, key));
    }
  }

  findById(id) {
    if (this._cacheManager.isEmpty(CACHE_ID, id)) {
      return this._cacheManager.find(CACHE_ID, id);
    } else {
      return this._libRepository.findById(id)
        .then((data) => this._cacheManager.modifyCache(CACHE_ID, id, data))
        .then(() => this._cacheManager.find(CACHE_ID, id));
    }
  }

  editBook(id, title, author) {
    return this._libRepository.editBook(id, title, author)
      .then(book => this._cacheManager.modifyCache(CACHE_ID, id, book))
      .then(book => this._cacheManager.deleteCache(FIND_CACHE_ID, book));
  }

  deleteBook(id) {
    return this._libRepository.deleteBook(id)
      .then(() => this._cacheManager.deleteRecord(CACHE_ID, id))
      .then(data => this._cacheManager.deleteCache(FIND_CACHE_ID, data));
  }
}

module.exports = LibraryService;
