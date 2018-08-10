"use strict";
const ObjectId = require('mongodb').ObjectID;
const models = require('../../mongo/library.schema');

class LibraryRepository {

    find(title = '.', author = '.', page, pageSize, sort) {
        return new Promise((resolve, reject) => {
            models.find({})
                .and([
                    { 'title': { $regex: title, $options: 'ig' } },
                    { 'author': { $regex: author, $options: 'ig' } }
                ])
                .skip((pageSize * page) - pageSize)
                .limit(Number(pageSize))
                .sort({ title: Number(sort) })
                .exec((error, result) => {
                    if (error) reject(error);
                    models.count({ 'title': { $regex: title, $options: 'ig' }, 'author': { $regex: author, $options: 'ig' } })
                        .exec((error, count) => {
                            if (error) reject(error);
                            resolve({ books: result, totalRecords: Math.ceil(count) });
                        });
                });
        })
    };

    addBook(title, author) {
        return new Promise((resolve, reject) => {
            models.create({
                'title': title, 'author': author
            }, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        })

    };

    deleteBook(id) {
        return new Promise((resolve, reject) => {
            models.remove({
                '_id': ObjectId(id)
            }, (error, data) => {
                if (error || data.n === 0) reject(error);
                resolve(data);
            })
        })
    }

    editBook(id, title, author) {
        return new Promise((resolve, reject) => {
            models.findByIdAndUpdate(id, { title, author }, { new: true },
                (error, data) => {
                    if (error || data.n === 0) reject(error);
                    resolve(data);
                });
        });
    };

    findById(id) {
        return new Promise((resolve, reject) => {
            models
                .findOne({ _id: ObjectId(id) })
                .lean().exec((error, data) => {
                    if (error) reject(error);
                    resolve(data);
                });
        });
    };
};

module.exports = LibraryRepository;