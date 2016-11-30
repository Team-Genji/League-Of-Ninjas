const constants = require('../config/constants/lol-urls'),
    format = require('string-format');

function getProfileIconLink(summonername, region) {
    let linksummonername = summonername.replace(/ /g,"%20");
    let link = format(constants.SUMMONER_ICON_LINK, region, linksummonername);
    return link;
}

module.exports = {
    getProfileIconLink
};
