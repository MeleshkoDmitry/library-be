const express = require('express');
const router = express.Router();

const LibraryRepository = require('./repository/library-db.repository');
const libRepository = new LibraryRepository();

const CacheManager = require('../common/cache.manager');
const cacheManager = new CacheManager();

const LibraryService = require('./library.service');
const libService = new LibraryService(libRepository, cacheManager);

const LibraryController = require('./library.controller');
const libController = new LibraryController(libService);

const LibraryValidator = require('./library.validator');
const libValidator = new LibraryValidator();

router.post('/', libValidator.addNewBook,
  libController.addBook.bind(libController));

router.get('/', libValidator.find,
  libController.find.bind(libController));

router.delete('/:id', libValidator.delBook,
  libController.deleteBook.bind(libController));

router.put('/:id', libValidator.editBook,
  libController.editBook.bind(libController));

router.get('/:id', libValidator.findById,
  libController.findById.bind(libController));

module.exports = router;