const leaguesField = 'leagues';

function getFullSummonersInfo(summonersInfo, summonersLeagueInfo, summonerIdField) {
    let summonersFullInfo = [];

    // Array is used when parsing in-game players
    if (Array.isArray(summonersInfo)) {
        summonersInfo.forEach(summoner => {
            let summonerFullInfo = summoner;
            let summonerId = summoner[summonerIdField];
            summonersFullInfo[leaguesField] = summonersLeagueInfo[summonerId];
            summonersFullInfo.push(summonerFullInfo);
        });
    } else {
        Object.keys(summonersInfo).forEach(key => {
            let summonerFullInfo = summonersInfo[key];
            let summonerId = summonerFullInfo[summonerIdField];
            summonerFullInfo[leaguesField] = summonersLeagueInfo[summonerId];
            summonersFullInfo.push(summonerFullInfo);
        });
    }
    return Promise.resolve()
        .then(() => {
            return summonersFullInfo;
        });
}

function getSummonerIds(summonersInfo, summonerIdField) {

    let summonerIds = [];

    Object.keys(summonersInfo).forEach(key => {
        summonerIds.push(summonersInfo[key][summonerIdField]);
    });

    return Promise.resolve()
        .then(() => {
            return summonerIds;
        });
}

module.exports = {
    getFullSummonersInfo,
    getSummonerIds
};