module.exports = function (models) {
    let {
        Topic
    } = models;

    return {
        createTopic(name) {
            let topic = new Topic({
                name
            });

            return new Promise((resolve, reject) => {
                topic.save(error => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(topic);
                });
            });
        },
        getTopics() {
            return new Promise((resolve, reject) => {
                Topic.find((error, forums) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(forums);
                });
            });
        },
        getTopicById(topicId) {
            return new Promise((resolve, reject) => {
                Topic.findOne({
                    _id: topicId
                }, (error, topic) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(topic);
                });
            });
        },
        addTopicToForum(topic, forum) {
            forum.topics.push({
                _id: topic.id,
                name: topic.name
            });

            return new Promise((resolve, reject) => {
                forum.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(forum);
                });
            });
        }
    };
};