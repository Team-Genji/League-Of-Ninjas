const constants = require('../../config/constants/lol-urls'),
    stringFormatter = require('../../utils/string-formatter'),
    uriEncoder = require('../../utils/uri-encoder');

function getProfileIconLink(summonername, region) {
    let link = stringFormatter.format(constants.SUMMONER_ICON_LINK, region, summonername);
    return uriEncoder.encode(link);
}

module.exports = {
    getProfileIconLink
};