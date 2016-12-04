const userNotLoggedInMessage = 'User not logged in!';

module.exports = function(data) {
    return {
        listTopicsInForum(req, res) {
            let {
                forumId
            } = req.params;

            return data.getForumById(forumId)
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
        },
        addTopicToForum(req, res) {
            if (!req.user) {
                return res.status(401).send({
                    message: userNotLoggedInMessage
                });
            }

            let {
                name
            } = req.body;
            let {
                forumId
            } = req.params;

            let topic = data.createTopic(name);
            let forum = data.getForumById(forumId);

            return Promise.all([topic, forum])
                .then(values => {
                    let [forumData, topicData] = values;

                    return data.addTopicToForum(forumData, topicData);
                })
                .then(resultForum => {
                    return res.redirect(`/forums/${resultForum.id}/topics`);
                })
                .catch(err => {
                    return res.status(406).send({
                        message: err.errors.name.message
                    });
                });
        },
        getTopicById(req, res) {
            let topicId = req.params.topicId;
            let forumId = req.params.forumId;

            return data.getTopicById(topicId)
                .then(topic => {
                    return res.render('./forums/topic-view', {
                        topic,
                        forumId,
                        user: req.user
                    });
                })
                .catch(err => {
                    return res.status(406).send({
                        message: err.message
                    });
                });
        },
        addCommentToTopic(req, res) {
            if (!req.user) {
                return res.status(401).send({
                    message: userNotLoggedInMessage
                });
            }

            let username = req.user.username;
            let content = req.body.content;
            let topicId = req.params.topicId;
            let forumId = req.params.forumId;

            data.getTopicById(topicId)
                .then(topic => {
                    return data.addCommentToTopic(username, content, topic);
                })
                .then(resultTopic => {
                    return res.redirect(`/forums/${forumId}/topics/${resultTopic.id}`);
                })
                .catch(err => {
                    return res.status(406).send({
                        message: err.message
                    });
                });
        }
    };
};