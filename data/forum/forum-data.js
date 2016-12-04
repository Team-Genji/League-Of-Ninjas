module.exports = function (models) {
    let {
        Forum
    } = models;

    return {
        createForum(name) {
            let forum = new Forum({
                name
            });

            return new Promise((resolve, reject) => {
                forum.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(forum);
                });
            });
        },
        getForums() {
            return new Promise((resolve, reject) => {
                Forum.find((err, forums) => {
                    if (err || !forums) {
                        return reject(err);
                    }

                    return resolve(forums);
                });
            });
        },
        getForumById(id) {
            return new Promise((resolve, reject) => {
                Forum.findOne({
                    _id: id
                }, (error, forum) => {
                    if (error || !forum) {
                        return reject(error);
                    }

                    return resolve(forum);
                });
            });
        }
    };
};