const authKeys = require('../../config/constants/lol-api-auth').AUTH_KEYS,
    keyProviderFactory = require('../../utils/key-provider'),
    requester = require('../../utils/http-requester'),
    lolApiRequesterFactory = require('../../lol-api-requester'),
    iconLinkProvider = require('../../utils/profile-icon-link-provider')

let authKeyProvider = keyProviderFactory.getKeyProvider(authKeys);

let lolApiRequester = lolApiRequesterFactory.getLoLApiRequester(requester, authKeyProvider);

module.exports = function () {
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
            lolApiRequester.summoner.getFullSummonersInfo(summonername, region)
                .then(summoners => {
                    summoners[0].iconLink = iconLink;
                    return res.render('league-info/summonerinfoget', {
                        summoner: summoners[0]
                    });
                })
                .catch(err => {
                    res
                        .status(400)
                        .send(err);
                });
        }
    };
};