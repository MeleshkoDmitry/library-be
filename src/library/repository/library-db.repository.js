"use strict";
const ObjectId = require('mongodb').ObjectID;
const models = require('../../mongo/library.schema');

class LibraryRepository {

  find(title, author, page, pageSize, sort) {
    const query = {
      $and: [{ title: { $regex: `^${title}`, $options: 'ig' } }, { author: { $regex: `^${author}`, $options: 'ig' } }]
    };
    return models
      .find(query)
      .skip((pageSize * page) - pageSize)
      .limit(Number(pageSize))
      .sort({ title: Number(sort) })
      .then(books => this._getBooksCount(query)
        .then(count => ({ books, totalRecords: Math.ceil(count) })))
      .catch(err => err)
  };

  _getBooksCount(query) {
    return models.count(query);
  }

  addBook(title, author) {
    return models
      .create({ title, author });
  };

  deleteBook(id) {
    return models
      .findByIdAndRemove(id);
  }

  editBook(id, title, author) {
    return models
      .findByIdAndUpdate(id, { title, author }, { new: true });
  };

  findById(id) {
    return models
      .findById(id);
  };
};

module.exports = LibraryRepository;