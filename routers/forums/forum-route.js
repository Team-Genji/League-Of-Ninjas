module.exports = function(app, data) {
    let controller = require('../../controllers/forum-controller')(data);

    app
        .get('/forums', controller.listForums)
        .post('/forums/create', controller.createForum);
};