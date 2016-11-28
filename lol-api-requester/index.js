const fs = require('fs'),
    path = require('path');

const commonConstants = require('../config/constants/common');
const BasicApirequster = require('./requester-abstract').BasicApiRequester;

const requestsFilter = '-requester';

class LoLApiRequester extends BasicApirequster {
    constructor(requester, authKeyProvider) {
        super(requester, authKeyProvider);
        this.registerRequesters();
    }

    registerRequesters() {
        fs.readdirSync(__dirname)
            .filter(fileName => fileName.indexOf(requestsFilter) >= 0)
            .forEach(fileName => {
                const requester = require(path.join(__dirname, fileName)).create(this._requester, this._authKeyProvider);
                const moduleName = fileName.substring(0, fileName.indexOf(requestsFilter));

                this[commonConstants.PRIVATE_FIELD_IDENTIFIER + moduleName] = requester;

                Reflect.defineProperty(this, moduleName, {
                    get: () => {
                        return this[commonConstants.PRIVATE_FIELD_IDENTIFIER + moduleName];
                    }
                });
            });
    }
}

module.exports.getLoLApiRequester = function(requester, authKeyProvider) {
    return new LoLApiRequester(requester, authKeyProvider);
};

module.exports.LoLApiRequester = LoLApiRequester;