/*globals require module*/

module.exports = function (data) {
    return {
        listTopics(req, res) {
            res.render('./forums/forum-main');
        }
    };
};