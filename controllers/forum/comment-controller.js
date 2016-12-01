module.exports = function (data) {
    return {
        addCommentToTopic(req, res) {
            let {
                username
            } = req.user;
            let {
                content
            } = req.body;
            let {
                topicId
            } = req.params;
            let {
                forumId
            } = req.params;

            let comment = data.createComment(username, content);
            let topic = data.getTopicById(topicId);

            return Promise.all([comment, topic])
                .then(values => {
                    let [commentData, topicData] = values;

                    return data.addCommentToTopic(commentData, topicData);
                })
                .then(resultTopic => {
                    return res.redirect(`/forums/${forumId}/topics/${resultTopic.id}`);
                })
                .catch(error => {
                    res
                        .status(400)
                        .send(error);
                });
        }
    };
};