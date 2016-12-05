module.exports = function(app, controllers) {
    let controller = controllers.chatController;

    app
        .get('/chat', controller.getChat);
};