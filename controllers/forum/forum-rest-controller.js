module.exports = function (data) {
    return {
        listForumsRest(req, res) {
            return data.getForums()
                .then(forums => {
                    res.status(200).json({
                        success: true,
                        message: 'Forums gotten successfuly!',
                        forums
                    });
                })
                .catch(error => {
                    res.status(409).json({
                        success: false,
                        message: error.message
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
                .catch(error => {
                    res.status(409).json({
                        success: false,
                        message: error.message
                    });
                });
        }
    };
};