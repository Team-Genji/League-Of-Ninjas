module.exports = function(app, controllers) {
    let controller = controllers.homeController;

    app.get('/home', controller.home);
};