/* globals require module*/

module.exports = function () {
    return {
        resolve(req, res) {
            res.redirect('/home');
        }
    };
};