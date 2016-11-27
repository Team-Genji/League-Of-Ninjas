/* globals module */

class BasicApiRequester {
    constructor(requester, authKeyProvider) {
        this._requester = requester;
        this._authKeyProvider = authKeyProvider;
    }
}

module.exports.BasicApiRequester = BasicApiRequester;