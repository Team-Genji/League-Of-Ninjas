module.exports = function() {
    return {
        name: 'defaultController',
        resolve(req, res) {
            return res.redirect('/home');
        }
    };
};