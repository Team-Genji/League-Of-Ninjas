/*globals require module*/

const express = require('express');

module.exports = function({ app, data }) {
    let controller = require('../../controllers/forum-controller')(data);
    let router = new express.Router();

    router.get('/forums', controller.listThreads);
    app.use('/forums', router);

    return router;
};