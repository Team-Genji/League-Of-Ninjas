const authKeys = require('../../config/constants/lol-api-auth').AUTH_KEYS,
    keyProviderFactory = require('../../utils/key-provider'),
    requester = require('../../utils/http-requester'),
    lolApiRequesterFactory = require('../../lol-api-requester'),
    lolObjectParser = require('../../lol-api-extensions/parsers/index'),
    iconLinkProvider = require('../../lol-api-extensions/utils/profile-icon-link-provider');

const regularIdField = 'id';
// const summonerIdField = 'summonerId';

let authKeyProvider = keyProviderFactory.getKeyProvider(authKeys);

let lolApiRequester = lolApiRequesterFactory.getLoLApiRequester(requester, authKeyProvider);

module.exports = function() {
    return {
        getSummonerInfo(req, res) {
            return res.render('league-info/summonerinfo');
        },
        getGameInfo(req, res) {
            return res.render('league-info/gameinfo');
        },
        // needs validation
        getSummonerInfoPage(req, res) {
            let summonername = [];
            summonername.push(req.body.summonername);
            let region = req.body.region;
            let iconLink = iconLinkProvider.getProfileIconLink(req.body.summonername, region);
            lolApiRequester.summoner.getSummonersInfo(summonername, region)
                .then(result => {
                    let summonerInfo = result.body;
                    if (!summonerInfo) {
                        throw new Error('Service unavailable');
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

                    return lolObjectParser.summonerInfoParser.getFullSummonersInfo(summonerInfo, summonerLeagueInfo, regularIdField);
                })
                .then(result => {
                    let summonerInfo = result[0];
                    summonerInfo.iconLink = iconLink;
                    return res.render('league-info/summonerinfoget', { summoner: summonerInfo });
                })
                .catch(err => {
                    res
                        .status(400)
                        .send(err);
                });
        }
    };
};