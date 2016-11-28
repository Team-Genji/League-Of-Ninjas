const modelRegistrator = require('../utils/model-registrator');

module.exports = modelRegistrator.register('Forum', {
    name: {
        type: String,
        required: true,
        unique: false
    },
    topics: [{}]
});