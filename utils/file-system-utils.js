/*globals require module*/

function walkDirectorySync(currentDirPath, callback) {
    const fs = require('fs'),
        path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        let filePath = path.join(currentDirPath, name);
        let stat = fs.statSync(filePath);

        if (stat.isFile()) {
            callback(filePath);
        } else if (stat.isDirectory()) {
            walkDirectorySync(filePath, callback);
        }
    });
}

module.exports = {
    walkDirectorySync
};