const mongoose = require('mongoose');
const fileWalker = require('../utils/file-system-utils').walkDirectorySync;
const User = require('../models/user-model');
const Forum = require('../models/forums/forum-model');
const Topic = require('../models/forums/topic-model');

module.exports = function (connectionString) {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    let models = {
        User,
        Forum,
        Topic
    };
    let data = {};

    fileWalker(__dirname, module => {
        if (module.includes('-data')) {
            let dataModule = require(module)(models);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        }
    });

    return data;
};