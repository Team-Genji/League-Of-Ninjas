const passport = require('passport');

module.exports = function(data) {
    return {
        loginLocal(req, res, next) {
            const auth = passport.authenticate('local', (error, user) => {
                if (error) {
                    next(error);
                    return;
                }

                if (user === false) {
                    return res.send({ success: false, message: 'Invalid username or password' });
                }
                req.login(user, err => {
                    if (err) {
                        next(err);
                        return;
                    }
                    return res.send({ success: true, message: 'Successfully logged in' });
                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },
        register(req, res) {
            let username = req.body.username;
            let password = req.body.password;
            let avatarUrl = req.body.avatarUrl;

            data.createUser(username, password, avatarUrl)
                .then(() => {
                    return res.send({ success: true, message: 'You successfully have been registered' });
                })
                .catch(error => res.status(500).json(error));
        },
        isAuthenticated(req, res, next) {
            if (!req.isAuthenticated()) {
                return res.send({ success: false, message: 'You are not allowed to do this' });
            }

            next();
        }
    };
};