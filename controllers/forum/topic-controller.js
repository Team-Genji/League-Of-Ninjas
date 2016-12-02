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
                    res
                        .status(400)
                        .send(err);
                });
        },
        addTopicToForum(req, res) {
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
                .catch(error => {
                    res
                        .status(400)
                        .send(error);
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
                .catch(error => {
                    res
                        .status(400)
                        .send(error);
                });
        }
    };
};