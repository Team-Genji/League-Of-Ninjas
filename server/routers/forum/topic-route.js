module.exports = function(app, controllers) {
    let controller = controllers.topicController;

    app
        .get('/forums/:forumId/topics', controller.listTopicsInForum)
        .get('/forums/:forumId/topics/:topicId', controller.getTopicById)
        .post('/forums/:forumId/topics', controller.addTopicToForum)
        .post('/forums/:forumId/topics/:topicId', controller.addCommentToTopic);
};