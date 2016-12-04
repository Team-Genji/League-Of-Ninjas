const userExistsErrorCode = 11000;
const validator = require('../validator');
const userExistsErrorMessage = 'User with this username already exists!';

module.exports = function (models) {
    let {
        User
    } = models;

    return {
        createUser(username, password, avatarUrl) {
            let user = new User({
                username,
                password,
                avatarUrl
            });
            return new Promise((resolve, reject) => {
                if (!validator.validateString(username, 3, 50)) {
                    return reject('You must enter correct username between 3 and 50 letters');
                }
                if (!validator.validateString(password, 6, 50)) {
                    return reject('You must enter correct password between 6 and 50 letters');
                }
                if (!validator.validateUrl(avatarUrl)) {
                    return reject('You must enter a valid url for your avatar');
                }
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
        },
        updateUserSettings(_id, settings) {
            return User.findById(_id, (err, user) => {
                if (err) {
                    return;
                }
                if (settings.password) {
                    user.password = settings.password;
                }
                if (settings.avatarUrl) {
                    user.avatarUrl = settings.avatarUrl;
                }
                user.save();
            });
        }
    };
};