module.exports = function(data) {
    return {
        name: 'topicRestController',
        listTopicsInForumRest(req, res) {
            let forumId = req.params.forumId;

            return data.getForumById(forumId)
                .then(forum => {
                    res.status(200).json({
                        success: true,
                        message: 'Forum topics gotten successfuly!',
                        topics: forum.topics
                    });
                })
                .catch(() => {
                    res.status(409).json({
                        success: false,
                        message: 'Could not get the topics of the specified forum!'
                    });
                });
        },
        getAllTopicsRest(req, res) {
            return data.getTopics()
                .then(topics => {
                    res.status(200).json({
                        success: true,
                        message: 'Forum topics gotten successfuly!',
                        topics
                    });
                })
                .catch(() => {
                    res.status(409).json({
                        success: false,
                        message: 'Could not get the topics!'
                    });
                });
        },
        getTopicByIdRest(req, res) {
            let topicId = req.params.topicId;

            return data.getTopicById(topicId)
                .then(topic => {
                    res.status(200).json({
                        success: true,
                        message: 'Topic gotten successfuly!',
                        topic
                    });
                })
                .catch(() => {
                    res.status(409).json({
                        success: false,
                        message: 'Could not get topic!'
                    });
                });
        },
        getComentsFromTopicRest(req, res) {
            let topicId = req.params.topicId;

            return data.getTopicById(topicId)
                .then(topic => {
                    res.status(200).json({
                        success: true,
                        message: 'Comments gotten successfuly!',
                        comments: topic.comments
                    });
                })
                .catch(() => {
                    res.status(409).json({
                        success: false,
                        message: 'Could not get comments!'
                    });
                });
        }
    };
};