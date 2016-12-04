module.exports = function() {
    return {
        getChat(req, res) {
            if (!req.user) {
                return res.render('errorpage', { error: { message: 'You need to be logged in in order to chat' } });
            }
            return res.render('chat/chat', { user: req.user });
        }
    };
};