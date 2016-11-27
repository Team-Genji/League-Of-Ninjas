/* globals module require*/
'use strict';

const format = require('string-format');

const requester = require('../utils/http-requester'),
    requestUrls = require('../config/constants/lol-api-urls'),
    commonConstants = require('../config/constants/common');

function getSummonersInfo(summonerNames, region, authKey) {
    let summonerNamesString = summonerNames.join(commonConstants.QUERY_STRING_SEPARATOR);
    let requestUrl = format(requestUrls.MULTIPLE_SUMMONERS_INFO_BY_USERNAME, region, summonerNamesString, authKey);
    return requester.getJSON(requestUrl);
}

function getSummonersLeague(summonerIds, region, authKey) {
    let summonerIdsString = summonerIds.join(commonConstants.QUERY_STRING_SEPARATOR);
    let requestUrl = format(requestUrls.MULTIPLE_SUMMONERS_LEAGUE_INFO_BY_ID, region, summonerIdsString, authKey);
    return requester.getJSON(requestUrl);
}

module.exports = {
    getSummonersInfo,
    getSummonersLeague
}

//==================================
//=         Sample Usage           =
//==================================

// getSummonersInfo(['Default Idiot', 'RS Kaliente'], 'eune', "RGAPI-30f4f640-e4b8-4ae7-8c60-8f2d67aae5f1")
//     .then(res => {
//         let summoners = []
//         Object.keys(res.body).forEach(key => {
//             summoners.push(res.body[key]);
//         })

//         return summoners;
//     }).then(players => {
//         let summonerIds = [];
//         for (let item of players) {
//             console.log('-----------------------------');
//             console.log(item);

//             summonerIds.push(item.id)
//         }

//         return summonerIds;
//     })
//     .then(ids => {
//         return getSummonersLeague(ids, 'eune', 'RGAPI-30f4f640-e4b8-4ae7-8c60-8f2d67aae5f1')
//     })
//     .then(result => {
//         console.log(result.body);
//     })