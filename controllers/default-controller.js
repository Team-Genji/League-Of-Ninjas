module.exports = function() {
    return {
        resolve(req, res) {
            return res.redirect('/home');
        }
    };
};