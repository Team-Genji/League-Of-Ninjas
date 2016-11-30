const BasicApiRequester = require('./requester-abstract').BasicApiRequester,
    requestUrls = require('../config/constants/lol-api-urls'),
    commonConstants = require('../config/constants/common'),
    stringFormatter = require('../utils/string-formatter');

class SummonerRequester extends BasicApiRequester {
    getSummonersInfo(summonerNames, region) {
        let summonerNamesString = summonerNames.join(commonConstants.QUERY_STRING_SEPARATOR);
        let requestUrl = stringFormatter.format(requestUrls.MULTIPLE_SUMMONERS_INFO_BY_USERNAME, region, summonerNamesString, this._authKeyProvider.nextKey);
        return this._requester.getJSON(requestUrl);
    }

    getSummonersLeague(summonerIds, region) {
        let summonerIdsString = summonerIds.join(commonConstants.QUERY_STRING_SEPARATOR);
        let requestUrl = stringFormatter.format(requestUrls.MULTIPLE_SUMMONERS_LEAGUE_INFO_BY_ID, region, summonerIdsString, this._authKeyProvider.nextKey);
        return this._requester.getJSON(requestUrl);
    }

    getFullSummonersInfo(summonerNames, region) {
        let promise = new Promise((resolve, reject) => {
            this.getSummonersInfo(summonerNames, region)
                .then(res => {
                    let summonerIds = [];
                    let summonersInfo = res.body;

                    Object.keys(summonersInfo).forEach(key => {
                        summonerIds.push(summonersInfo[key].id);
                    });

                    return { summonerIds, summonersInfo };
                })
                .then(res => {
                    return Promise.all([this.getSummonersLeague(res.summonerIds, region), res.summonersInfo]);
                })
                .then(res => {
                    let summonersLeagueInfoResponse = res[0];
                    let summonersLeagueInfo = summonersLeagueInfoResponse.body;
                    let summonersInfo = res[1];

                    let summonersFullInfo = [];

                    Object.keys(summonersInfo).forEach(key => {
                        let summonerFullInfo = summonersInfo[key];
                        let summonerId = summonerFullInfo.id;
                        summonerFullInfo.leagues = summonersLeagueInfo[summonerId];
                        summonersFullInfo.push(summonerFullInfo);
                    });

                    return summonersFullInfo;
                })
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });

        return promise;
    }
}

module.exports.create = function(...args) {
    return new SummonerRequester(...args);
};

module.exports.UserRequester = SummonerRequester;

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