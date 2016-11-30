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
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.login(user, err => {
                    if (err) {
                        next(err);
                        return;
                    }

                    res.redirect('/profile');
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

            data.createUser(username, password)
                .then(() => {
                    return res.redirect('/signin');
                })
                .catch(error => res.status(500).json(error));
        }
    };
};