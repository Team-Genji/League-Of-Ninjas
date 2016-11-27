/* globals require __dirname module*/

const fs = require('fs');

const commonConstants = require('../config/constants/common');
const BasicApirequster = require('./requester-abstract').BasicApiRequester;

const requestsFilter = '-requester'

class LoLApiRequester extends BasicApirequster {
    constructor(requester, authKeyProvider) {
        super(requester, authKeyProvider);
        this.registerRequesters(this);
    }

    registerRequesters(context) {
        fs.readdirSync(__dirname)
            .filter(fileName => fileName.indexOf(requestsFilter) >= 0)
            .forEach(fileName => {
                const requester = require(__dirname + commonConstants.DIRECTORY_SEPARATOR + fileName).create(this._requester, this._authKeyProvider);
                const moduleName = fileName.substring(0, fileName.indexOf(requestsFilter));

                this[commonConstants.PRIVATE_FIELD_IDENTIFIER + moduleName] = requester;

                Object.defineProperty(this, moduleName, {
                    get: function() {
                        return this[commonConstants.PRIVATE_FIELD_IDENTIFIER + moduleName];
                    }
                })
            });
    }
}

module.exports.getLoLApiRequester = function(requester, authKeyProvider) {
    return new LoLApiRequester(requester, authKeyProvider);
};

module.exports.LoLApiRequester = LoLApiRequester;