module.exports = function() {
    return {
        name: 'homeController',
        home(req, res) {
            return res.render('./main/home', {
                user: req.user
            });
        }
    };
};