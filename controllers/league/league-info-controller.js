const authKeys = require('../../config/constants/lol-api-auth').AUTH_KEYS,
    keyProviderFactory = require('../../utils/key-provider'),
    requester = require('../../utils/http-requester'),
    lolApiRequesterFactory = require('../../lol-api-requester'),
    lolObjectParser = require('../../lol-api-extensions/parsers/index'),
    iconLinkProvider = require('../../lol-api-extensions/utils/profile-icon-link-provider');
const regularIdField = 'id';
// const summonerIdField = 'summonerId';

const queryParams = {
    summonerName: 'summonername',
    region: 'region'
};

let authKeyProvider = keyProviderFactory.getKeyProvider(authKeys);

let lolApiRequester = lolApiRequesterFactory.getLoLApiRequester(requester, authKeyProvider);

module.exports = function() {
    return {
        getSummonerSearch(req, res) {
            return res.render('league-info/summonersearch', { user: req.user });
        },
        getGameSearch(req, res) {
            return res.render('league-info/gamesearch', { user: req.user });
        },
        getSummonerInfo(req, res) {
            let summonerName = req.query[queryParams.summonerName];
            let summonerNames = [];
            summonerNames.push(summonerName);
            let region = req.query[queryParams.region];
            lolApiRequester.summoner.getSummonersInfo(summonerNames, region)
                .then(result => {
                    let summonerInfo = result.body;

                    if (!summonerInfo) {
                        throw new Error('Service unavailable');
                    } else if (summonerInfo.status.message) {
                        throw new Error('Summoner not found');
                    }

                    console.log(summonerInfo);
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

                    return lolObjectParser.summonerInfoParser.getFullSummonersInfo(summonerInfo, summonerLeagueInfo, regularIdField);
                })
                .then(result => {
                    let summonerInfo = result[0];
                    let iconLink = iconLinkProvider.getProfileIconLink(summonerInfo.name, region);
                    summonerInfo.iconLink = iconLink;
                    summonerInfo.region = region;
                    console.log(summonerInfo);
                    return res.render('league-info/summonerinfo', { summoner: summonerInfo, user: req.user });
                })
                .catch(err => {
                    console.log(err);
                    return res.render('errorpage', { error: { message: err.message }, user: req.user });
                });
        },
        getGameInfo(req, res) {
            let summonerName = req.query[queryParams.summonerName];
            let summonerNames = [];
            summonerNames.push(summonerName);
            let region = req.query[queryParams.region];
            lolApiRequester.summoner.getSummonersInfo(summonerNames, region)
                .then(result => {
                    let summonerInfo = result.body;

                    if (!summonerInfo) {
                        throw new Error('Service unavailable');
                    } else if (summonerInfo.status.message) {
                        throw new Error('Summoner not found');
                    }
                    return Promise.all([lolObjectParser.summonerInfoParser.getSummonerIds(summonerInfo, regularIdField), summonerInfo]);
                })
                .then(result => {
                    let summonerIds = result[0];
                    console.log(result);
                    return lolApiRequester.game.getGameInfo(summonerIds[0], region);
                })
                .then(result => {
                    let gameInfo = result.body;
                    if (!gameInfo) {
                        throw new Error('Service unavailable');
                    } else if (gameInfo.status.message) {
                        throw new Error('Summoner is not an active game');
                    }

                    return lolObjectParser.gameInfoParser.getSimpleGameInfo(gameInfo);
                })
                .then(result => {
                    return lolObjectParser.gameInfoParser.devidePlayersByTeams(result.participants);
                })
                .then(result => {
                    let participantsInfo = result;
                    return res.render('league-info/gameinfo', { gameInfo: participantsInfo, user: req.user });
                })
                .catch(err => {
                    return res.render('errorpage', { error: { message: err.message }, user: req.user });
                });
        }
    };
};