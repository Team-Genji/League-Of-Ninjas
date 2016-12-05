const modelRegistrator = require('../utils/model-registrator');
const minTopicNameLength = 10;
const maxTopicNameLength = 50;

module.exports = modelRegistrator.register('Topic', {
    name: {
        type: String,
        required: true,
        unique: false,
        maxlength: [maxTopicNameLength, 'Topic name is too long'],
        minlength: [minTopicNameLength, 'Topic name is too short!']
    },
    // _id
    comments: [{}]
});