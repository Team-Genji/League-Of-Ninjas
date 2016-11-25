/*globals require module  */
/*jshint esversion: 6 */
// 
const data = require('../dummy-db'),
    createUsersController = require('../controllers/users-controllers'),
    createAuthController = require('../controllers/auth-controllers'),
    router = require('express').Router();

const authController = createAuthController(data),
    usersController = createUsersController(data);

module.exports= function({app,data}){

    router
    .get('/signin',usersController.getLogin)  //get Sign in view (login)
    .post('/signin', authController.loginLocal) // post Sign in data (register)
    .get('/signup', usersController.getRegister)  //get Sign up view (login)
    .post('/signup', authController.register)  // post Sign up data (register)
    .get('/profile', usersController.getProfile) // get profile view
    .get('/unauthorized', usersController.getUnauthorized);

    app.use(router);

};