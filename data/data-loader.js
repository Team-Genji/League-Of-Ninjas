/*globals require module  */
/*jshint esversion: 6 */

const fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose');

module.exports = function(connectionString) {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    let User = require('../models/user-model');
    let models = { User };
    let data = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes('-data'))
        .forEach(file => {
            let modulePath = path.join(__dirname, file);
            let dataModule = require(modulePath)(models);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });
    return data;
};