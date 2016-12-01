module.exports = function(app, data) {
    let controller = require('../../controllers/forum/comment-controller')(data);

    app.post('/forums/:forumId/topics/:topicId', controller.addCommentToTopic);
};