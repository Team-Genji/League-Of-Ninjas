module.exports = function (models) {
    let {
        Comment
    } = models;

    return {
        createComment(authorName, content) {
            let comment = new Comment({
                author: authorName,
                content
            });

            return new Promise((resolve, reject) => {
                comment.save(error => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(comment);
                });
            });
        },
        addCommentToTopic(comment, topic) {
            topic.comments.push(comment);

            return new Promise((resolve, reject) => {
                topic.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(topic);
                });
            });
        },
        getCommentsByAuthor(authorName) {
            return new Promise((resolve, reject) => {
                Comment.find({
                    author: authorName
                }, (error, comment) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(comment);
                });
            });
        },
        getCommentById(commentId) {
            return new Promise((resolve, reject) => {
                Comment.findOne({
                    _id: commentId
                }, (error, comment) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(comment);
                });
            });
        }
    };
};