const format = require('string-format');

const BasicApiRequester = require('./requester-abstract').BasicApiRequester,
    requestUrls = require('../config/constants/lol-api-urls'),
    commonConstants = require('../config/constants/common');

class UserRequester extends BasicApiRequester {
    getSummonersInfo(summonerNames, region) {
        let summonerNamesString = summonerNames.join(commonConstants.QUERY_STRING_SEPARATOR);
        let requestUrl = format(requestUrls.MULTIPLE_SUMMONERS_INFO_BY_USERNAME, region, summonerNamesString, this._authKeyProvider.nextKey);
        return this._requester.getJSON(requestUrl);
    }

    getSummonersLeague(summonerIds, region) {
        let summonerIdsString = summonerIds.join(commonConstants.QUERY_STRING_SEPARATOR);
        let requestUrl = format(requestUrls.MULTIPLE_SUMMONERS_LEAGUE_INFO_BY_ID, region, summonerIdsString, this._authKeyProvider.nextKey);
        return this._requester.getJSON(requestUrl);
    }
}

module.exports.create = function(...args) {
    return new UserRequester(...args);
};

module.exports.UserRequester = UserRequester;

// ==================================
// =         Sample Usage           =
// ==================================

// getSummonersInfo(['Default Idiot', 'RS Kaliente'], 'eune')
//     .then(res => {
//         let summoners = [];
//         Object.keys(res.body).forEach(key => {
//             summoners.push(res.body[key]);
//         });

//         return summoners;
//     })
//     .then(players => {
//         let summonerIds = [];
//         for (let item of players) {
//             console.log('-----------------------------');
//             console.log(item);

//             summonerIds.push(item.id);
//         }

//         return summonerIds;
//     })
//     .then(ids => {
//         return getSummonersLeague(ids, 'eune');
//     })
//     .then(result => {
//         console.log(result.body);
//     });