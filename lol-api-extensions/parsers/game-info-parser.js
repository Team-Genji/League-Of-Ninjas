const simpleMatchInfoFields = [
    'gameMode',
    'bannedChampions',
    'participants'
];

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

function getSimpleMatchInfo(matchInfo) {
    let simpleMatchInfo = {};

    simpleMatchInfoFields.forEach(field => {
        simpleMatchInfo[field] = matchInfo[field];
    });

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

module.exports = {
    getSimpleMatchInfo,
    devidePlayersByTeams
};