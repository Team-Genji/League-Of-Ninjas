const REGIONS = {
    BR: 'br',
    EUNE: 'eune',
    EUW: 'euw',
    JP: 'jp',
    KR: 'kr',
    LAN: 'lan',
    LAS: 'las',
    NA: 'na',
    OCE: 'oce',
    RU: 'ru',
    TR: 'tr'
};

const PLATFORMS = {
    [REGIONS.BR]: 'BR1',
    [REGIONS.EUNE]: 'EUN1',
    [REGIONS.EUW]: 'EUW1',
    [REGIONS.JP]: 'JP1',
    [REGIONS.KR]: 'KR',
    [REGIONS.LAN]: 'LA1',
    [REGIONS.LAS]: 'LA2',
    [REGIONS.NA]: 'NA1',
    [REGIONS.OCE]: 'OC1',
    [REGIONS.RU]: 'RU',
    [REGIONS.TR]: 'TR1'
};

const SUMMONER_ICON_LINK = 'http://avatar.leagueoflegends.com/{0}/{1}.png'

module.exports = {
    REGIONS,
    PLATFORMS,
    SUMMONER_ICON_LINK
};