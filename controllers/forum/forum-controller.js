const userNotLoggedInMessage = 'User not logged in!';
const onlyAdminsCanPostMessage = 'Only admins can create forums!';

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
                return res.render('errorpage', {
                    error: {
                        message: userNotLoggedInMessage
                    }
                });
            }

            if (req.user.role !== 'admin') {
                let jsonResponse = JSON.stringify({
                    onlyAdminsCanPostMessage
                });
                res.status(406).json(jsonResponse);
            }

            let {
                name
            } = req.body;

            return data.createForum(name)
                .then(() => {
                    return res.redirect('/forums');
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