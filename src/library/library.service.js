'use strict';
const cacheId = 'books';
const findcacheId = 'books_find';

class LibraryService {
    constructor(libRepository, cacheManager) {
        this._libRepository = libRepository;
        this._cacheManager = cacheManager;
    }

    find(title, author) {
        const key = title + author;
        if (this._cacheManager.isEmpty(findcacheId, key)) {
            return this._cacheManager.find(findcacheId, key);
        } else {
            return this._libRepository.find(title, author)
                .then(data => {
                    return this._cacheManager.modifyCache(findcacheId, key, data);
                }).then(data => {
                    return this._cacheManager.find(findcacheId, key);
                })
        }
    }

    addToLibrary(title, author) {
        return this._libRepository.addBook(title, author)
            .then(data => {
                return this._cacheManager.modifyCache(cacheId, data.id, data)
                    .then(data => {
                        return this._cacheManager.deleteCache(findcacheId, data)
                    })
            });
    }

    editBookFromLibrary(id, title, author) {
        return this._libRepository.editBook(id, title, author)
            .then((data) => {
                return this._libRepository.findById(id)
                    .then((data) => {
                        return this._cacheManager.modifyCache(cacheId, id, data)
                            .then(data => {
                                return this._cacheManager.deleteCache(findcacheId, data)
                            })
                    });
            });
    }

    deleteBookFromLibrary(id) {
        return this._libRepository.deleteBook(id)
            .then((data) => {
                return this._cacheManager.deleteRecord(cacheId, id)
                    .then((data) => {
                        return this._cacheManager.deleteCache(findcacheId, data)
                    })
            });
    }

    findById(id) {
        if (this._cacheManager.isEmpty(cacheId, id)) {
            return this._cacheManager.find(cacheId, id);
        } else {
            return this._libRepository.findById(id)
                .then((data) => {
                    return this._cacheManager.modifyCache(cacheId, id, data)
                        .then((data) => { return this._cacheManager.find(cacheId, id) });
                });
        }
    }
}

module.exports = LibraryService;
