const models = require('../../mongo/auth.schema');

class AuthDbRepository {

    findByUserAndPass(user, hashPassword) {
        return new Promise((resolve, reject) => {
            return models
                .findOne({ user: user, password: hashPassword }, function (error, data) {
                    if (error || !data) {
                        reject(error)
                    }
                    else {
                        resolve(data);
                    }
                });
        });
    };
}

module.exports = AuthDbRepository;