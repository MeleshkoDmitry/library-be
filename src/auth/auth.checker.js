module.exports = function (req, res, next) {
    if (req.session && req.session.user)
        return next();
    else
        return res.status(401).send('Access denied. You should be login. ');
}

