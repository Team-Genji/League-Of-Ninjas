/* globals module require*/
'use strict';

const format = require('string-format'),
    requester = require('../utils/http-requester'),
    requestUrls = require('../config/constants/lol-api-urls'),
    commonConstants = require('../config/constants/common'),
    localeConstants = require('../config/constants/lol-api-locale');

function getGameInfo(summonerId, region, authKey) {
    let requestUrl = format(requestUrls.CURRENT_GAME_INFO_BY_USER_ID, region, localeConstants.PLATFORMS[region], summonerId, authKey);
    return requester.getJSON(requestUrl);
}

// getGameInfo('27154907', 'eune', 'RGAPI-30f4f640-e4b8-4ae7-8c60-8f2d67aae5f1')
//     .then(result => {
//         console.log(result.body);
//     })