/*globals require module  */
/*jshint esversion: 6 */

const fs = require('fs'),
    path = require('path');

module.exports = function({ app, data }) {
    fs.readdirSync(__dirname)
        .filter(file => file.includes('-routes'))
        .forEach(file => {
            const modulePath = path.join(__dirname, file);
            require(modulePath)({ app, data });
        });
};