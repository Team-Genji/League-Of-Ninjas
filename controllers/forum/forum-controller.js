module.exports = function (data) {
    return {
        listForums(req, res) {
            data.getForums()
                .then(forums => {
                    res.render('./forums/forum-main', {
                        models: forums,
                        user: req.user
                    });
                })
                .catch(err => {
                    res
                        .status(400)
                        .send(err);
                });
        },
        createForum(req, res) {
            let {
                name
            } = req.body;

            data.createForum(name)
                .then(() => {
                    return res.redirect('/forums');
                })
                .catch(err => {
                    res
                        .status(400)
                        .send(err);
                });
        }
    };
};