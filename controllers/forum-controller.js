/*globals require module*/

module.exports = function (data) {
    return {
        listThreads(req, res) {
            console.log('sirenie');
            res.render('/forums/forum-main');
        }
    };
};