module.exports = function(app, controllers) {
    let authController = controllers.authentication;
    let usersController = controllers.userController;

    app
        .get('/signin', usersController.getLogin)
        .post('/signin', authController.loginLocal)
        .get('/signup', usersController.getRegister)
        .post('/signup', authController.register)
        .get('/sign-out', authController.logout)
        .get('/profile', usersController.getProfile)
        .post('/profile/', authController.isAuthenticated, usersController.updateUser);
};