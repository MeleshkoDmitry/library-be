const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
    title: String,
    author: String
}, {
        versionKey: false
    });

module.exports = mongoose.model('library', LibrarySchema, 'library');