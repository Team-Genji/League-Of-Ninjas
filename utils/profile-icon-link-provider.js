const constants = require('../config/constants/lol-urls'),
    stringFormatter = require('./string-formatter'),
    uriEncoder = require('./uri-encoder');

function getProfileIconLink(summonername, region) {
    let link = stringFormatter.format(constants.SUMMONER_ICON_LINK, region, summonername);
    return uriEncoder.encode(link);
}

module.exports = {
    getProfileIconLink
};