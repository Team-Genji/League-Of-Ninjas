const leaguesField = 'leagues';
const queueField = 'queue';

function getFullSummonersInfo(summonersInfo, summonersLeagueInfo, summonerIdField) {
    let summonersFullInfo = [];


    // Array is used when parsing in-game players
    if (Array.isArray(summonersInfo)) {
        summonersInfo.forEach(summoner => {
            let summonerFullInfo = summoner;
            let summonerId = summoner[summonerIdField];

            let summonerLeagueInfo = summonersLeagueInfo[summonerId];
            if (summonerLeagueInfo) {
                summonerLeagueInfo.forEach((leagueInfo, index) => {
                    summonerLeagueInfo[index][queueField] = summonerLeagueInfo[index][queueField].replace(/_/g, ' ');
                });
            }

            summonersFullInfo[leaguesField] = summonerLeagueInfo;
            summonersFullInfo.push(summonerFullInfo);
        });
    } else {
        Object.keys(summonersInfo).forEach(key => {
            let summonerFullInfo = summonersInfo[key];
            let summonerId = summonerFullInfo[summonerIdField];

            let summonerLeagueInfo = summonersLeagueInfo[summonerId];

            if (summonerLeagueInfo) {
                summonerLeagueInfo.forEach((leagueInfo, index) => {
                    summonerLeagueInfo[index][queueField] = summonerLeagueInfo[index][queueField].replace(/_/g, ' ');
                });
            }

            summonerFullInfo[leaguesField] = summonerLeagueInfo;
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