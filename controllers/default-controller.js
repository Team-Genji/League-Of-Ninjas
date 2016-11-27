/*globals require module*/

module.exports = function (data) {
    return {
        resolve(req, res) {
            res.redirect('/home');
        }
    };
};