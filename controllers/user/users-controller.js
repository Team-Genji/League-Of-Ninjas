const usersServices = require('../../data/user/user-data');

module.exports = function(data) {
    return {
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
                return res.render('./user-controls/profile', { user });
            }
        },
        getUnauthorized(req, res) {
            res.send('<h1>Unauthorized!</h1>');
        },
        updateUser(req, res) {
            const settings = req.body;
            data.updateUserSettings(req.user._id, settings).then(result => res.status(200).json(settings));
        },
        getRegister(req, res) {
            return res.render('./user-controls/signup');
        }
    };
};