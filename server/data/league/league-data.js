const lolObjectParser = require('../../lol-api-extensions/parsers');
const regularIdField = 'id';
const summonerIdField = 'summonerId';

module.exports = function(lolApiRequester) {
    return {
        getSummonersInfo(usernames, region) {
            return lolApiRequester.summoner.getSummonersInfo(usernames, region)
                .then(result => {
                    let summonerInfo = result.body;

                    if (!summonerInfo) {
                        throw new Error('Service unavailable');
                    } else if (summonerInfo.status && summonerInfo.status.message) {
                        throw new Error('Summoner not found');
                    }

                    return Promise.all([lolObjectParser.summonerInfoParser.getSummonerIds(summonerInfo, regularIdField), summonerInfo]);
                })
                .then(result => {
                    let summonerIds = result[0];
                    let summonerInfo = result[1];

                    return Promise.all([lolApiRequester.summoner.getSummonersLeague(summonerIds, region), summonerInfo]);
                })
                .then(result => {
                    let summonerLeagueInfo = result[0].body;
                    let summonerInfo = result[1];

                    return lolObjectParser.summonerInfoParser.getFullSummonersInfo(summonerInfo, summonerLeagueInfo, regularIdField, region);
                });
        },
        getGameInfoByUsername(username, region) {
            return lolApiRequester.summoner.getSummonersInfo([username], region)
                .then(result => {
                    let summonerInfo = result.body;

                    if (!summonerInfo) {
                        throw new Error('Service unavailable');
                    } else if (summonerInfo.status && summonerInfo.status.message) {
                        throw new Error('Summoner not found');
                    }
                    return Promise.all([lolObjectParser.summonerInfoParser.getSummonerIds(summonerInfo, regularIdField), summonerInfo]);
                })
                .then(result => {
                    let summonerIds = result[0];
                    return lolApiRequester.game.getGameInfo(summonerIds[0], region);
                })
                .then(result => {
                    let gameInfo = result.body;
                    if (!gameInfo) {
                        throw new Error('Service unavailable');
                    } else if (gameInfo.status && gameInfo.status.message) {
                        throw new Error('Summoner is not in an active game');
                    }
                    return Promise.all(
                        [lolObjectParser.summonerInfoParser.getSummonerIds(gameInfo.participants, summonerIdField), gameInfo]);
                })
                .then(result => {
                    let summonerIds = result[0];
                    let gameInfo = result[1];
                    return Promise.all([lolApiRequester.summoner.getSummonersLeague(summonerIds, region), gameInfo]);
                })
                .then(result => {
                    let summonersLeagues = result[0].body;
                    let gameInfo = result[1];
                    return Promise.all([
                        lolObjectParser.summonerInfoParser.getFullSummonersInfo(gameInfo.participants, summonersLeagues, summonerIdField),
                        gameInfo
                    ]);
                })
                .then(result => {
                    let participants = result[0];
                    let gameInfo = result[1];
                    gameInfo.participants = participants;

                    return lolObjectParser.gameInfoParser.parseGameInfo(gameInfo);
                });
        }
    };
};