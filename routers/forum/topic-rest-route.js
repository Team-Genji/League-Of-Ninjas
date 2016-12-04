module.exports = function(app, data) {
    let controller = require('../../controllers/forum/topic-rest-controller')(data);

    app
        .get('/api/forums/:forumId/topics', controller.listTopicsInForumRest)
        .get('/api/topics', controller.getAllTopicsRest)
        .get('/api/topics/:topicId', controller.getTopicByIdRest)
        .get('/api/topics/:topicId/comments', controller.getComentsFromTopicRest);
};