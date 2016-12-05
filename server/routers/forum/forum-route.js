module.exports = function(app, controllers) {
    let controller = controllers.forumController;

    app
        .get('/forums', controller.listForums)
        .get('/forums/:id', controller.getForumById)
        .post('/forums', controller.createForum);
};