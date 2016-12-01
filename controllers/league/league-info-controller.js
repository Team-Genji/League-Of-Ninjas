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
            return res.render('league-info/summonersearch');
        },
        getGameSearch(req, res) {
            return res.render('league-info/gameinfo');
        },
        // needs validation
        getSummonerInfo(req, res) {
            let summonerName = req.query[queryParams.summonerName];
            let summonerNames = [];
            summonerNames.push(summonerName);
            let region = req.query[queryParams.region];
            let iconLink = iconLinkProvider.getProfileIconLink(summonerName, region);
            lolApiRequester.summoner.getSummonersInfo(summonerNames, region)
                .then(result => {
                    let summonerInfo = result.body;

                    if (!summonerInfo) {
                        throw new Error('Service unavailable');
                    }
                    else if (summonerInfo.status){
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

                    return lolObjectParser.summonerInfoParser.getFullSummonersInfo(summonerInfo, summonerLeagueInfo, regularIdField);
                })
                .then(result => {
                    let summonerInfo = result[0];
                    summonerInfo.iconLink = iconLink;
                    return res.render('league-info/summonerinfo', { summoner: summonerInfo });
                })
                .catch(err => {
                    console.log(err);
                    return res.render('errorpage', { error: { message: err.message } });
                });
        }
    };
};