const userNotLoggedInMessage = 'User not logged in!';

module.exports = function (data) {
    return {
        listForums(req, res) {
            return data.getForums()
                .then(forums => {
                    res.render('./forums/forum-main', {
                        forums,
                        user: req.user
                    });
                })
                .catch(err => {
                    return res.render('errorpage', {
                        error: {
                            message: err.message
                        },
                        user: req.user
                    });
                });
        },
        createForum(req, res) {
            if (!req.user) {
                let jsonResponse = JSON.stringify({
                    userNotLoggedInMessage
                });

                res.status(406).json(jsonResponse);
            }

            let {
                name
            } = req.body;

            return data.createForum(name)
                .then(forum => {
                    return res.status(200).json({
                        success: true,
                        message: 'Forum created successfuly!',
                        forum
                    });
                })
                .catch(() => {
                    return res.status(409).json({
                        success: false,
                        message: 'Invalid forum name!'
                    });
                });
        },
        getForumById(req, res) {
            let id = req.params.id;

            return data.getForumById(id)
                .then(forum => {
                    return res.render('./forums/topic-list', {
                        forum,
                        user: req.user
                    });
                })
                .catch(err => {
                    return res.render('errorpage', {
                        error: {
                            message: err.message
                        },
                        user: req.user
                    });
                });
        }
    };
};