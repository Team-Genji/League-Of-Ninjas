const queryParams = {
    summonerName: 'summonername',
    region: 'region'
};

module.exports = function(data) {
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
            data.getSummonersInfo(summonerNames, region)
                .then(result => {
                    let summonerInfo = result[0];
                    return res.render('league-info/summonerinfo', { summoner: summonerInfo, user: req.user });
                })
                .catch(err => {
                    return res.render('errorpage', { error: { message: err.message }, user: req.user });
                });
        },
        getGameInfo(req, res) {
            let summonerName = req.query[queryParams.summonerName];
            let region = req.query[queryParams.region];
            data.getGameInfoByUsername(summonerName, region)
                .then(result => {
                    return res.render('league-info/gameinfo', { gameInfo: result, user: req.user });
                })
                .catch(err => {
                    return res.render('errorpage', { error: { message: err.message }, user: req.user });
                });
        }
    };
};