const platformsRegions = require('../../config/constants/lol-api-locale').PLATFORMS_REGIONS;

const simpleGameInfoFields = {
    gameMode: 'gameMode',
    participants: 'participants',
    platformId: 'platformId'
};

const teamIdField = 'teamId';

const leagueTeams = {
    blue: {
        name: 'blue',
        id: 100
    },
    red: {
        name: 'red',
        id: 200
    }
};

function getSimpleGameInfo(gameInfo) {
    let simpleMatchInfo = {};

    Object.keys(simpleGameInfoFields).forEach(key => {
        let field = simpleGameInfoFields[key];
        simpleMatchInfo[field] = gameInfo[field];
    });
    simpleMatchInfo[simpleGameInfoFields.platformId] = platformsRegions[simpleMatchInfo[simpleGameInfoFields.platformId]];
    return Promise.resolve()
        .then(() => {
            return simpleMatchInfo;
        });
}

function devidePlayersByTeams(participants) {
    let teams = {};
    teams[leagueTeams.blue.name] = [];
    teams[leagueTeams.red.name] = [];

    participants.forEach(participant => {
        if (participant[teamIdField] === leagueTeams.blue.id) {
            teams[leagueTeams.blue.name].push(participant);
        } else if (participant[teamIdField] === leagueTeams.red.id) {
            teams[leagueTeams.red.name].push(participant);
        }
    });

    return Promise.resolve()
        .then(() => {
            return teams;
        });
}

function parseGameInfo(gameinfo) {
    return getSimpleGameInfo(gameinfo)
        .then(simpleGameInfo => {
            return Promise.all([devidePlayersByTeams(simpleGameInfo[simpleGameInfoFields.participants]), simpleGameInfo]);
        })
        .then(res => {
            let teams = res[0];
            let simpleGameInfo = res[1];
            simpleGameInfo[simpleGameInfoFields.participants] = teams;
            return simpleGameInfo;
        });
}

module.exports = {
    getSimpleGameInfo,
    devidePlayersByTeams,
    parseGameInfo
};