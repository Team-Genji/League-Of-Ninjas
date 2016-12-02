module.exports = function () {
    return {
        getChat(req, res) {
            return res.render('chat/chat.pug', { user: req.user });
        }
    };
};