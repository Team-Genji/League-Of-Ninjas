/* globals require module*/

module.exports = function () {
    return {
        listTopics(req, res) {
            res.render('./forums/forum-main');
        }
    };
};