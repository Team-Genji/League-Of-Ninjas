const passport = require('passport');

module.exports = function (data) {
    return {
        name: 'authentication',
        loginLocal(req, res, next) {
            const auth = passport.authenticate('local', (error, user) => {
                if (error) {
                    next(error);
                    return;
                }

                if (user === false) {
                    return res.send({
                        success: false,
                        message: 'Invalid username or password'
                    });
                }
                req.login(user, err => {
                    if (err) {
                        next(err);
                        return;
                    }
                    return res.send({
                        success: true,
                        message: 'Successfully logged in'
                    });
                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            return Promise.resolve()
                .then(() => {
                    req.logout(() => {
                        return res.send({
                            success: true,
                            message: 'Successfully logged out'
                        });
                    });
                })
                .then(() => {
                    res.redirect('/home');
                });

        },
        register(req, res) {
            let username = req.body.username;
            let password = req.body.password;
            let avatarUrl = req.body.avatarUrl;
            let minPasswordLenght = 6;
            let maxPasswordLenght = 24;

            if (password.length < minPasswordLenght) {
                return res.send({
                    success: false,
                    message: `Password must be at least ${minPasswordLenght} characters`
                });
            }

            if (password.length > maxPasswordLenght) {
                return res.send({
                    success: false,
                    message: `Password must be less than ${maxPasswordLenght} characters`
                });
            }


            data.createUser(username, password, avatarUrl)
                .then(() => {
                    return res.send({
                        success: true,
                        message: 'You successfully have been registered'
                    });
                })
                .catch(error => {
                    return res.send({
                        success: false,
                        message: `${error}`
                    });
                });
        },
        isAuthenticated(req, res, next) {
            if (!req.isAuthenticated()) {
                return res.send({
                    success: false,
                    message: 'You are not allowed to do this'
                });
            }

            next();
        }
    };
};