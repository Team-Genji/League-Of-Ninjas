module.exports = function(app, data) {
    let controller = require('../../controllers/topic-controller')(data);

    app
        .get('/forums/:forumId/topics', controller.listTopicsInForum)
        .get('/forums/:forumId/topics/:topicId', controller.getTopicById)
        .post('/forums/:forumId/topics', controller.addTopicToForum)
        .post('/forums/:forumId/topics/:topicId', controller.addCommentToTopic);
};