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
                    return res.status(406).send({
                        message: err.message
                    });
                });
        },
        createForum(req, res) {
            if (!req.user) {
                return res.status(401).send({
                    message: 'User not logged in!'
                });
            }

            if (req.user.role !== 'admin') {
                res.status(406).send({
                    message: 'Only admins can create forums!'
                });
            }

            let {
                name
            } = req.body;

            return data.createForum(name)
                .then(() => {
                    return res.redirect('/forums');
                })
                .catch(err => {
                    return res.status(406).send({
                        message: err.errors.name.message
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
                    return res.status(406).send({
                        message: err.message
                    });
                });
        }
    };
};