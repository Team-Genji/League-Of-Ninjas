module.exports = function() {
    return {
        getSummonerInfo(req, res) {
            return res.render('league-info/summonerinfo');
        }
    };
};