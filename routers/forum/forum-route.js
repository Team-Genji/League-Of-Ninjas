module.exports = function(app, data) {
    let controller = require('../../controllers/forum-controller')(data);

    app
        .get('/forums', controller.listForums)
        .get('/forums/:id', controller.getForumById)
        .post('/forums', controller.createForum);
};