/* jshint esversion: 6 */

module.exports = function(app, data) {
    let authController = require('../controllers/auth-controller')(data);
    let usersController = require('../controllers/users-controller')(data);
    let leagueinfocontroller = require('../controllers/league-info-controller')(data);

    app
        .get('/signin', usersController.getLogin)
        .get('/signin', usersController.getLogin)
        .post('/signin', authController.loginLocal)
        .get('/signup', usersController.getRegister)
        .post('/signup', authController.register)
        .get('/profile', usersController.getProfile)
        .get('/summonerinfo', leagueinfocontroller.getSummonerInfo)
        .get('/unauthorized', usersController.getUnauthorized);
};