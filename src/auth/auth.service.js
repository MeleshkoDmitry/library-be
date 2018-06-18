const crypto = require('crypto');

class AuthService {

    constructor(authRepository) {
        this._authRepository = authRepository;
    }

    logIn(user, password) {
        const secret = 'SECRET';
        const hashPassword = crypto
            .createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        return this._authRepository.findByUserAndPass(user, hashPassword);
    }
}

module.exports = AuthService;