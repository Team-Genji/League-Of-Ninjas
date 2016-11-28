const request = require('request');

function get(url) {
    let promise = new Promise((resolve, reject) => {
        request(url, (err, response, body) => {
            if (err) {
                return reject(err);
            }

            resolve({ response, body });
        });
    });
    return promise;
}

function getJSON(url) {
    let requestHeader = {
        url,
        json: true
    };

    return get(requestHeader);
}

module.exports = {
    get,
    getJSON
};