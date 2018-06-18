module.exports = function (req, res, next) {
    req.checkBody('user', 'Enter Username').notEmpty();
    req.checkBody('password', 'Minimum 5 characters').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        console.log('Validate error');
        res.status(400).json({ errors });
    } else {
        next();
    }
}
