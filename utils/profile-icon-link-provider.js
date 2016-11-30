const constants = require('../config/constants/lol-api-locale'),
    format = require('string-format');

function getProfileIconLink(summonername, region) {
    var linksummonername = summonername.replace(/ /g,"%20");
    var link = format(constants.SUMMONER_ICON_LINK, region, linksummonername);
    return link;
}

module.exports = {
    getProfileIconLink
}

//console.log(getProfileIconLink("RS Kaliente", "eune"));