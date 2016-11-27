/*globals require module  */
/*jshint esversion: 6 */

const mongoose = require('mongoose');
const fileWalker = require('../utils/file-system-utils').walkDirectorySync;
const user = require('../models/user-model');

module.exports = function (connectionString) {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    let models = {
        user
    };
    let data = {};

    fileWalker(__dirname, (module) => {
        if (module.includes('-route')) {
            let dataModule = require(module)(models);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        }
    });

    return data;
};