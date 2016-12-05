module.exports = function(app, controllers) {
    let controller = controllers.leagueInfoController;

    app
        .get('/summonersearch', controller.getSummonerSearch)
        .get('/gamesearch', controller.getGameSearch)
        .get('/summonerinfo', controller.getSummonerInfo)
        .get('/gameinfo', controller.getGameInfo);
};