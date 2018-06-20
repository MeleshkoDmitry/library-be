"use strict";
const ObjectId = require('mongodb').ObjectID;
const models = require('../../mongo/library.schema');

class LibraryRepository {

    find(title = '.', author = '.', page, perPage) {
        return new Promise(function (resolve, reject) {
            models.find({})
                .and([
                    { 'title': { $regex: title, $options: 'ig' } },
                    { 'author': { $regex: author, $options: 'ig' } }
                ])
                .skip((perPage * page) - perPage)
                .limit(Number(perPage))
                .sort({title: 1})
                .exec(function (error, result) {
                    if (error) reject(error);
                    models.count().exec(function (error, count) {
                        if (error) reject(error);
                        resolve([result, Math.ceil(count / perPage)]);
                    });
                });
        })
    };

    addBook(title, author) {
        return new Promise(function (resolve, reject) {
            models.create({
                'title': title, 'author': author
            }, function (error, data) {
                if (error) reject(error);
                resolve(data);
            });
        })

    };

    deleteBook(id) {
        return new Promise(function (resolve, reject) {
            models.remove({
                '_id': ObjectId(id)
            }, function (error, data) {
                if (error || data.n === 0) reject(error);
                resolve(data);
            })
        })
    }

    editBook(id, title, author) {
        return new Promise(function (resolve, reject) {
            models.update({
                '_id': ObjectId(id),
            }, {
                    'title': title,
                    'author': author
                }, function (error, data) {
                    if (error || data.n === 0) reject(error);
                    resolve(data);
                });
        });
    };

    findById(id) {
        return new Promise(function (resolve, reject) {
            models
                .findOne({ _id: ObjectId(id) })
                .lean().exec(function (error, data) {
                    if (error) reject(error);
                    resolve(data);
                });
        });
    };
};

module.exports = LibraryRepository;