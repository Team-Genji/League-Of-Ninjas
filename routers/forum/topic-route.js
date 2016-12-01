module.exports = function(app, data) {
    let controller = require('../../controllers/forum/topic-controller')(data);

    app
        .get('/forums/:forumId/topics', controller.listTopicsInForum)
        .get('/forums/:forumId/topics/:topicId', controller.getTopicById)
        .post('/forums/:forumId/topics/create', controller.addTopicToForum);
};