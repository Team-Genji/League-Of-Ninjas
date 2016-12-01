module.exports = function(app, data) {
    let controller = require('../../controllers/forum/forum-controller')(data);

    app
        .get('/forums', controller.listForums)
        .get('/forums/:id', controller.getForumById)
        .post('/forums/create', controller.createForum);
};