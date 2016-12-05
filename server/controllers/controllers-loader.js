const fileWalker = require('../utils/file-system-utils').walkDirectorySync;

module.exports = function(params) {
    let controllers = {};

    fileWalker(__dirname, file => {
        if (file.includes('-controller')) {
            const modulePath = file;
            let theModule = require(modulePath)(params);
            controllers[theModule.name] = theModule;
        }
    });
    return controllers;
};