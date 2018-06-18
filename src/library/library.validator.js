class LibraryValidator {

    find(req, res, next) {
        req.checkQuery('title', 'Enter title ');
        req.checkQuery('author', 'Enter author  ');
        LibraryValidator._errorHandler(req, res, next);
    };

    addNewBook(req, res, next) {
        req.checkBody('title', 'Enter Title').notEmpty();
        req.checkBody('author', 'Enter Author').notEmpty();
        LibraryValidator._errorHandler(req, res, next);
    };

    editBook(req, res, next) {
        req.checkParams('id', 'Enter id').notEmpty();
        req.checkBody('_id', "Enter _id").notEmpty();
        req.checkBody('title', 'Enter Title').notEmpty();
        req.checkBody('author', 'Enter Author').notEmpty();
        LibraryValidator._errorHandler(req, res, next);
    };

    delBook(req, res, next) {
        req.checkParams('id', 'id is empty').notEmpty();
        LibraryValidator._errorHandler(req, res, next);
    };

    findById(req, res, next) {
        req.checkParams('id', 'Enter id').notEmpty();
        LibraryValidator._errorHandler(req, res, next);
    };

    static _errorHandler(req, res, next) {
        const errors = req.validationErrors();
        if (errors) {
            console.log('Validate error');
            res.status(400).json({ errors });
        } else {
            next();
        }
    };
}

module.exports = LibraryValidator;
