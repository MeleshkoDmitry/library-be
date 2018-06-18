const Auth = require('../json/auth.db');

class AuthRepository {

    findByUserAndPass(user, hashPassword) {
        return new Promise(function (resolve, reject) {
            for (const dbElement of Auth) {
                if (dbElement.user === user
                    && dbElement.password === hashPassword) {
                    resolve(dbElement);
                    break;
                }
            }
            reject('Error: User not found!');
        });
    };
};

module.exports = AuthRepository;