/*globals require module  */
/*jshint esversion: 6 */

module.exports = function (data) {
    return {
        getHome(req, res) {
            res.status(200).send(`
                <h1>${req.user ? req.user.username : 'Log in'}</h1>
            `);
        },
        getLogin(req, res) {
            return res.render('login');
        },
        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/unauthorized');
            } else {
                const user = req.user;
                res.status(200).send(`Welcome, ${user.username}! Go to <a href='/home'>Home</a>`);
            }
        },
        getUnauthorized(req, res) {
            res.send('<h1>Unauthorized!</h1>');
        },
        getRegister(req, res) {
            res.status(200).send(`
                <form action='/register' method='POST'>
                    <input type='text' name='username' placeholder='Username' />
                    <input type='text' name='password' placeholder='Password' />
                    <input type='submit' value='Submit'>
                </form>
            `);
        }
    };
};