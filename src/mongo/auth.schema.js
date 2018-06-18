const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AuthSchema = new Schema({
    email: { type: String },
    user: { type: String },
    password: { type: String, select: false }
});

module.exports = mongoose.model('authentication', AuthSchema,'authentication');