const modelRegistrator = require('../utils/model-registrator');

module.exports = modelRegistrator.register('Comment', {
    author: {
        type: String,
        required: true,
        unique: false
    },
    content: {
        type: String,
        required: true,
        unique: false
    }
});