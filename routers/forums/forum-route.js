/* globals require module*/

module.exports = function (app, data) {
    let controller = require('../../controllers/forum-controller')(data);

    app.get('/forums', controller.listTopics);
};