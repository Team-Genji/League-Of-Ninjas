/*globals require module  */
/*jshint esversion: 6 */
// 
const data = require('../dummy-db'),
    createUsersController = require('../controllers/users-controllers'),
    createAuthController = require('../controllers/auth-controllers'),
    router = require('express').Router();

const authController = createAuthController(data),
    usersController = createUsersController(data);

module.exports= function(app){

    router
    .get('/login',usersController.getLogin)
    .post('/login', authController.loginLocal)
    .get('/register', usersController.getRegister)
    .post('/register', authController.register)
    .get('/profile', usersController.getProfile)
    .get('/unauthorized', usersController.getUnauthorized);

    app.use(router);

};