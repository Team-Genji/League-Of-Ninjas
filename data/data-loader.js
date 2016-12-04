const mongoose = require('mongoose');
const fileWalker = require('../utils/file-system-utils').walkDirectorySync;
const User = require('../models/user-model');
const Forum = require('../models/forums/forum-model');
const Topic = require('../models/forums/topic-model');

const requester = require('../utils/http-requester');
const lolApiAuthKeys = require('../config/constants/lol-api-auth').AUTH_KEYS;
const lolApiAuthKeyProvider = require('../utils/key-provider').getKeyProvider(lolApiAuthKeys);
const lolApiRequester = require('../lol-api-requester').getLoLApiRequester(requester, lolApiAuthKeyProvider);

module.exports = function(connectionString, validator) {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    let models = {
        User,
        Forum,
        Topic
    };
    let data = {};

    fileWalker(__dirname, module => {
        let dataModule = {};
        if (module.includes('league')) {
            dataModule = require(module)(lolApiRequester);
        } else if (module.includes('-data')) {
            dataModule = require(module)(models, validator);
        }
        Object.keys(dataModule)
            .forEach(key => {
                data[key] = dataModule[key];
            });
    });

    return data;
};