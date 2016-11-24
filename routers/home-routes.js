/*globals require module  */
/*jshint esversion: 6 */

const express = require('express');
let Router = express.Router;

module.exports = function({ app, data }) {
    let controller = require('../controllers/home-controllers')(data);

    let router = new Router();

    router
        .get('/', controller.home);

    app.use('/', router);

    return router;
};