const modelRegistrator = require('../utils/model-registrator');

module.exports = modelRegistrator.register('Topic', {
    name: {
        type: String,
        required: true,
        unique: false
    },
    // _id
    comments: [{}]
});