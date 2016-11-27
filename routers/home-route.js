/*globals require module*/
/*jshint esversion: 6 */

module.exports = function (app, data) {
    let controller = require('../controllers/home-controller')(data);

    app.get('/home', controller.home);
};