/*globals require module*/
/*jshint esversion: 6 */

const express = require('express');

module.exports = function({ app, data }) {
    let controller = require('../controllers/home-controller')(data);
    let router = new express.Router();

    router.get('/', controller.home);
    app.use('/', router);

    return router;
};