module.exports = function(app, controllers) {
    let controller = controllers.defaultController;

    app.get('/', controller.resolve);
};