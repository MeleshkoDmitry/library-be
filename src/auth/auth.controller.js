class AuthController {

    constructor(authService) {
        this._authService = authService;
    }

    logIn(req, res, next) {
        return this._authService.logIn(req.body.user, req.body.password)
            .then(data => {
                req.session.user = req.body.user;
                res.status(200).send('Login successful');
            })
            .catch(error => {
                res.status(401).send('Login failed');
            });
    }

    logOut(req, res, next) {
        req.session.destroy();
        res.send("Logout successful!");
    }
}

module.exports = AuthController;