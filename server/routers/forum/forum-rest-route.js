module.exports = function(app, controllers) {
    let controller = controllers.forumRestController;

    app
        .get('/api/forums', controller.listForumsRest)
        .get('/api/forums/:id', controller.getForumByIdRest)
        .post('/api/forums', controller.createForumRest);
};