module.exports = function(app, data) {
    let controller = require('../../controllers/forum/forum-rest-controller')(data);

    app
        .get('/api/forums', controller.listForumsRest)
        .get('/api/forums/:id', controller.getForumByIdRest)
        .post('/api/forums/create', controller.createForumRest);
};