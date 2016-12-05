// const usersServices = require('../../data/user/user-data');

module.exports = function (data) {
    return {
        name: 'userController',
        getHome(req, res) {
            res.status(200).send(`
                <h1>${req.user ? req.user.username : 'Log in'}</h1>
            `);
        },
        getLogin(req, res) {
            return res.render('./user-controls/signin');
        },
        getProfile(req, res) {
            if (req.isAuthenticated() === false) {
                res.status(401).redirect('/unauthorized');
            } else {
                const user = req.user;
                return res.render('./user-controls/profile', {
                    user
                });
            }
        },
        getUnauthorized(req, res) {
            res.send('<h1>Unauthorized!</h1>');
        },
        updateUser(req, res) {
            let settings = {};
            let password = req.body.password;
            let avatarUrl = req.body.avatarUrl;
            let minPasswordLenght = 6;
            let maxPasswordLenght = 24;

            if (password) {
                if (password.length < minPasswordLenght) {
                    return res.send({
                        success: false,
                        message: `Password must be at least ${minPasswordLenght} characters`
                    });
                }
                if (password.length > maxPasswordLenght) {
                    return res.send({
                        success: false,
                        message: `Password must be at least ${maxPasswordLenght} characters`
                    });
                }
                settings.password = password;
            }
            if (avatarUrl) {
                settings.avatarUrl = avatarUrl;
            }

            data.updateUserSettings(req.user._id, settings)
                .then(() => {
                    return res.send({
                        success: true,
                        message: 'You successfully updated profile'
                    });
                })
                .catch(error => {
                    return res.send({
                        success: false,
                        message: `${error}`
                    });
                });
        },
        getRegister(req, res) {
            return res.render('./user-controls/signup');
        }
    };
};