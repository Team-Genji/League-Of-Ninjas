/* globals require console */

const authKeys = require('./config/constants/lol-api-auth').AUTH_KEYS,
    keyProviderFactory = require('./utils/key-provider'),
    requester = require('./utils/http-requester'),
    lolApiRequesterFactory = require('./lol-api-requester');

let authKeyProvider = keyProviderFactory.getKeyProvider(authKeys);

let lolApiRequester = lolApiRequesterFactory.getLoLApiRequester(requester, authKeyProvider);

lolApiRequester.user.getSummonersInfo(['Funnnyyy'], 'eune')
    .then(res => {
        console.log('------------------');
        console.log('Summoner info');
        console.log('-------');
        console.log(res.body);
        console.log('------------------');

        let summonerIds = [];
        Object.keys(res.body).forEach(key => {
            summonerIds.push(res.body[key].id)
        })
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
    })

lolApiRequester.user.getSummonersInfo(['Funnnyyy', 'HystericShadow'], 'eune')
    .then(res => {
        console.log('------------------');
        console.log('Summoner info');
        console.log('-------');
        console.log(res.body);
        console.log('------------------');

        let summonerIds = [];

        Object.keys(res.body).forEach(key => {
            summonerIds.push(res.body[key].id)
        })

        return summonerIds;
    })
    .then(ids => {
        return lolApiRequester.user.getSummonersLeague(ids, 'eune');
    })
    .then(res => {
        console.log('------------------');
        console.log('Devision info');
        console.log('-------');
        console.log(res.body);
        console.log('------------------');
    })