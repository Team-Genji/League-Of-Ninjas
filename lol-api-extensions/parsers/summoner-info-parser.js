const leaguesField = 'leagues';
const queueField = 'queue';
const soloQueueField = 'RANKED_SOLO_5x5';

function getFullSummonersInfo(summonersInfo, summonersLeagueInfo, summonerIdField) {
    let summonersFullInfo = [];

    // Array is used when parsing in-game players
    if (Array.isArray(summonersInfo)) {
        summonersInfo.forEach((summoner, index) => {
            if (summoner.bot) {
                summonersFullInfo.push(summoner);
                return;
            }

            let summonerFullInfo = summoner;
            let summonerId = summoner[summonerIdField];

            let summonerLeagueInfo = summonersLeagueInfo[summonerId];
            let soloQueueInfo;
            if (summonerLeagueInfo) {
                for (let ind = 0; ind < summonerLeagueInfo.length; ind += 1) {
                    if (summonerLeagueInfo[ind][queueField] === soloQueueField) {
                        summonerLeagueInfo[ind][queueField] = summonerLeagueInfo[ind][queueField].replace(/_/g, ' ');
                        soloQueueInfo = summonerLeagueInfo[ind];
                        break;
                    }
                }
            }

            summonersFullInfo.push(summonerFullInfo);
            summonersFullInfo[index][leaguesField] = soloQueueInfo;
        });
    } else {
        Object.keys(summonersInfo).forEach(key => {
            let summonerFullInfo = summonersInfo[key];
            let summonerId = summonerFullInfo[summonerIdField];

            let summonerLeagueInfo = summonersLeagueInfo[summonerId];

            if (summonerLeagueInfo) {
                for (let index = 0; index < summonerLeagueInfo.length; index += 1) {
                    summonerLeagueInfo[index][queueField] = summonerLeagueInfo[index][queueField].replace(/_/g, ' ');
                }
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
    // Array is used when extracting from in-game players
    if (Array.isArray(summonersInfo)) {
        summonersInfo.forEach(summoner => {
            if (summoner.bot) {
                return;
            }

            summonerIds.push(summoner[summonerIdField]);
        });
    } else {
        Object.keys(summonersInfo).forEach(key => {
            summonerIds.push(summonersInfo[key][summonerIdField]);
        });
    }
    return Promise.resolve()
        .then(() => {
            return summonerIds;
        });
}

module.exports = {
    getFullSummonersInfo,
    getSummonerIds
};