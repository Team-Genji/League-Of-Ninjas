/*globals require module  */
/*jshint esversion: 6 */

module.exports = function (app, data) {
    let authController = require('../controllers/auth-controller')(data);
    let usersController = require('../controllers/users-controller')(data);

    app
        .get('/signin', usersController.getLogin)
        .get('/signin', usersController.getLogin) //get Sign in view (login)
        .post('/signin', authController.loginLocal) // post Sign in data (register)
        .get('/signup', usersController.getRegister) //get Sign up view (login)
        .post('/signup', authController.register) // post Sign up data (register)
        .get('/profile', usersController.getProfile) // get profile view
        .get('/unauthorized', usersController.getUnauthorized);
};