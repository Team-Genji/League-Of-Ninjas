const authKeys = require('./config/constants/lol-api-auth').AUTH_KEYS,
    keyProviderFactory = require('./utils/key-provider'),
    requester = require('./utils/http-requester'),
    lolApiRequesterFactory = require('./lol-api-requester');

let authKeyProvider = keyProviderFactory.getKeyProvider(authKeys);

let lolApiRequester = lolApiRequesterFactory.getLoLApiRequester(requester, authKeyProvider);
let lolData = require('./data/league/league-data')(lolApiRequester);

lolApiRequester.summoner.getSummonersInfo(['Sleepwalkin'], 'eune')
    .then(res => {
        console.log('------------------');
        console.log('Summoner info');
        console.log('-------');
        console.log(res.body);
        console.log('------------------');

        let summonerIds = [];
        Object.keys(res.body).forEach(key => {
            summonerIds.push(res.body[key].id);
        });

        return summonerIds[0];
    })
    .then(id => {
        return lolApiRequester.game.getGameInfo(id, 'eune');
    })
    .then(res => {
        console.log('------------------');
        console.log('Game info');
        console.log('-------');
        console.log(res.body);
        console.log('------------------');
    });

lolApiRequester.summoner.getSummonersInfo(['Funnnyyy', 'HystericShadow'], 'eune')
    .then(res => {
        console.log('------------------');
        console.log('Summoner info');
        console.log('-------');
        console.log(res.body);
        console.log('------------------');

        let summonerIds = [];

        Object.keys(res.body).forEach(key => {
            summonerIds.push(res.body[key].id);
        });

        return summonerIds;
    })
    .then(ids => {
        return lolApiRequester.summoner.getSummonersLeague(ids, 'eune');
    })
    .then(res => {
        console.log('------------------');
        console.log('Devision info');
        console.log('-------');
        console.log(res.body);
        console.log('------------------');
    });

// League DATA usage
lolData.getSummonersInfo(['Error', 'Status', 'NAME_THAT_SHOULD_NOT_RETURN_AN_USER'], 'eune')
    .then(res => {
        console.log('--------------------------------------------------------------------');
        console.log('LEAGUE-DATA USAGE');
        console.log('-------');
        console.log('LEAGUE-DATA SummonerInfo');
        console.log('------------------');
        console.log(res);
    })
    .catch(err => {
        console.log(err.message);
    });

lolData.getGameInfoByUsername('111201189141', 'euw')
    .then(res => {
        console.log('--------------------------------------------------------------------');
        console.log('LEAGUE-DATA USAGE');
        console.log('-------');
        console.log('LEAGUE-DATA GameInfoByUsername');
        console.log('------------------');
        console.log(res);
        console.log(res.participants.blue);
        console.log(res.participants.red);
    })
    .catch(err => {
        console.log(err.message);
    });