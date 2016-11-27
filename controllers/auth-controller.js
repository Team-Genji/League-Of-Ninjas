/*globals require module  */
/*jshint esversion: 6 */

const passport = require('passport');

module.exports = function (data) {
    return {
        loginLocal(req, res, next) {
            const auth = passport.authenticate('local', function (error, user) {
                if(error) {
                    next(error);
                    return;
                }

                if(!user) {
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.login(user, error => {
                    if(error) {
                        next(error);
                        return;
                    }

                    res.redirect('/profile');
                });
            });

            auth(req, res, next);
        },
        loginGithub(req, res, next) {
            const auth = passport.authenticate('github', function (error, user) {
                if(error) {
                    next(error);
                    return;
                }

                if(!user) {
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.login(user, error => {
                    if(error) {
                        next(error);
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

            data.createUser(username,password)
                .then(dbUser => {
                    return res.redirect('/signin');
                })
                .catch(error => res.status(500).json(error));
        }
    };
};