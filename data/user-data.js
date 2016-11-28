/* jshint esversion: 6 */

const userExistsErrorCode = 11000;
const userExistsErrorMessage = 'User with this username aleready exists!';

module.exports = function(models) {
    let { User } = models;

    return {
        createUser(username, password) {
            let user = new User({ username, password });
            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        if (err.code === userExistsErrorCode) {
                            return reject(userExistsErrorMessage);
                        }

                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};