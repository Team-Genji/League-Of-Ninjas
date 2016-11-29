module.exports = function() {
    return {
        getSummonerInfo(req, res) {
            return res.render('league-info/summonerinfo');
        },
        getGameInfo(req, res) {
            return res.render('league-info/gameinfo');
        },
        //needs validation
        getSummonerInfoPage(req, res) {
            let summonername = req.body.summonername;
            let region = req.body.region;
            
            return res.render('league-info/summonerinfoget')
        }
    };
};