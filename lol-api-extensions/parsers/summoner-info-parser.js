function getFullSummonersInfo(summonersInfo, summonersLeagueInfo) {
    let summonersFullInfo = [];

    Object.keys(summonersInfo).forEach(key => {
        let summonerFullInfo = summonersInfo[key];
        let summonerId = summonerFullInfo.id;
        summonerFullInfo.leagues = summonersLeagueInfo[summonerId];
        summonersFullInfo.push(summonerFullInfo);
    });

    return Promise.resolve()
        .then(() => {
            return summonersFullInfo;
        });
}

function getSummonerIds(summonersInfo) {

    let summonerIds = [];

    Object.keys(summonersInfo).forEach(key => {
        summonerIds.push(summonersInfo[key].id);
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