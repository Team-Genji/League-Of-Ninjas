module.exports = function(app, data) {
    let chatController = require('../controllers/chat/chat-controller')(data);

    app
        .get('/chat', chatController.getChat);
};