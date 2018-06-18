var express = require('express');
var router = express.Router();

const AuthRepository = require('./repository/auth-db.repository');
const authRepository = new AuthRepository();

const AuthService = require('./auth.service');
const authService = new AuthService(authRepository);

const AuthController = require('./auth.controller');
const authController = new AuthController(authService);
//validator
const AuthValidator = require('./auth.validator');
//authChecker
const authChecker = require('./auth.checker');

router.post('/login', AuthValidator, authController.logIn.bind(authController));

router.post('/logout', authChecker, authController.logOut.bind(authController));

module.exports = router;