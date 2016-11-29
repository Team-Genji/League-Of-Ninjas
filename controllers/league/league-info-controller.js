const authKeys = require('../../config/constants/lol-api-auth').AUTH_KEYS,
    keyProviderFactory = require('../../utils/key-provider'),
    requester = require('../../utils/http-requester'),
    lolApiRequesterFactory = require('../../lol-api-requester');

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
            lolApiRequester.summoner.getFullSummonersInfo(summonername, region)
                .then(summoner => {
                    console.log(summoner);
                    return res.render('league-info/summonerinfoget', summoner[0]);
                });
        }
    };
};