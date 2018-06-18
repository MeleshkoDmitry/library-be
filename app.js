const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const validator = require('express-validator');
const libraryRoutes = require('./src/library/library.routes');
const app = express();

app.listen(3000, () => console.log('App listening on port 3000!'));

app.use(cors())

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));
mongoose.connect('mongodb://localhost:27017/library', function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});
app.use('/library', libraryRoutes)

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});
module.exports = app;