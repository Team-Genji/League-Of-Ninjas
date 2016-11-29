module.exports = function() {
    return {
        getSummonerInfo(req, res) {
            return res.render('league-info/summonerinfo');
        },
        getGameInfo(req, res) {
            return res.render('league-info/gameinfo');
        },
        getSummonerInfoPage(req, res) {
            return res.render('league-info/gameinfotest')
        }
    };
};