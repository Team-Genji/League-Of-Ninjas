module.exports = function(app, controllers) {
    let controller = controllers.topicRestController;

    app
        .get('/api/forums/:forumId/topics', controller.listTopicsInForumRest)
        .get('/api/topics', controller.getAllTopicsRest)
        .get('/api/topics/:topicId', controller.getTopicByIdRest)
        .get('/api/topics/:topicId/comments', controller.getComentsFromTopicRest);
};