var express = require('express');
var router = express.Router();

const LibraryRepository = require('./repository/library-db.repository');
const libRepository = new LibraryRepository();

const CacheManager = require('../common/cache.manager');
const cacheManager = new CacheManager();

const LibraryService = require('./library.service');
const libService = new LibraryService(libRepository, cacheManager);

const LibraryController = require('./library.controller');
const libController = new LibraryController(libService);

//validator
const LibraryValidator = require('./library.validator');
const libValidator = new LibraryValidator();

//Routes Library
router.get('/', libValidator.find,
    libController.find.bind(libController));

router.post('/', libValidator.addNewBook,
    libController.addNewBook.bind(libController));

router.delete('/:id', libValidator.delBook,
    libController.delBook.bind(libController));

router.put('/:id', libValidator.editBook,
    libController.editBook.bind(libController));

router.get('/:id', libValidator.findById,
    libController.findByID.bind(libController));

module.exports = router;