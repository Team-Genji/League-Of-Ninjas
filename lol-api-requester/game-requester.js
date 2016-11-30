const BasicApiRequester = require('./requester-abstract').BasicApiRequester,
    requestUrls = require('../config/constants/lol-api-urls'),
    localeConstants = require('../config/constants/lol-api-locale'),
    stringFormatter = require('../utils/string-formatter');

class GameRequester extends BasicApiRequester {
    getGameInfo(summonerId, region) {
        let requestUrl = stringFormatter.format(requestUrls.CURRENT_GAME_INFO_BY_USER_ID, region, localeConstants.PLATFORMS[region], summonerId, this._authKeyProvider.nextKey);
        return this._requester.getJSON(requestUrl);
    }
}

module.exports.create = function(...args) {
    return new GameRequester(...args);
};

module.exports.GameRequester = GameRequester;

// ==================================
// =         Sample Usage           =
// ==================================

// getGameInfo('27154907', 'eune')
//     .then(result => {
//         console.log(result.body);
//     });