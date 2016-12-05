module.exports = function(data) {
    return {
        name: 'forumRestController',
        listForumsRest(req, res) {
            return data.getForums()
                .then(forums => {
                    res.status(200).json({
                        success: true,
                        message: 'Forums gotten successfuly!',
                        forums
                    });
                })
                .catch(() => {
                    res.status(409).json({
                        success: false,
                        message: 'Could not get the forums!'
                    });
                });
        },
        getForumByIdRest(req, res) {
            let id = req.params.id;

            return data.getForumById(id)
                .then(forum => {
                    res.status(200).json({
                        success: true,
                        message: 'Forum gotten successfuly!',
                        forum
                    });
                })
                .catch(() => {
                    res.status(409).json({
                        success: false,
                        message: 'Could not get forum!'
                    });
                });
        },
        createForumRest(req, res) {
            if (!req.user) {
                return res.status(401).send({
                    success: false,
                    message: 'User not logged in!'
                });
            }

            if (req.user.role !== 'admin') {
                res.status(401).send({
                    success: false,
                    message: 'Only admins can create forums!'
                });
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
                    res.status(409).json({
                        success: false,
                        message: 'Could not create forum!'
                    });
                });
        }
    };
};