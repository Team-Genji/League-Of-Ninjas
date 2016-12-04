const fileWalker = require('../utils/file-system-utils').walkDirectorySync;

module.exports = function(app, data, controllers) {
    fileWalker(__dirname, file => {
        if (file.includes('-route')) {
            const modulePath = file;
            require(modulePath)(app, data, controllers);
        }
    });
};