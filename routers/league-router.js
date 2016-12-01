module.exports = function(app, data) {
    let leagueinfocontroller = require('../controllers/league/league-info-controller')(data);

    app
        .get('/summonersearch', leagueinfocontroller.getSummonerSearch)
        .get('/gamesearch', leagueinfocontroller.getGameSearch)
        .get('/summonerinfo', leagueinfocontroller.getSummonerInfo)
        .get('/gameinfo', leagueinfocontroller.getGameInfo);
};