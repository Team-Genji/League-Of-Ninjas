/*globals require module*/
/*jshint esversion: 6 */

module.exports = function ({
    app,
    data
}) {
    const fileWalker = require('../utils/file-system-utils').walkDirectorySync;

    fileWalker(__dirname, (file) => {
        if (file.includes('-route')) {
            const modulePath = file;
            require(modulePath)({
                app,
                data
            });
        }
    });
};