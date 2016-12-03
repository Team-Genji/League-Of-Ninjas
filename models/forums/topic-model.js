const modelRegistrator = require('../utils/model-registrator');
const minTopicNameLength = 5;
const maxTopicNameLength = 20;

module.exports = modelRegistrator.register('Topic', {
    name: {
        type: String,
        required: true,
        unique: false,
        minlength: [minTopicNameLength, 'Topic name is too short!'],
        maxlength: [maxTopicNameLength, 'Topic name is too long']
    },
    // _id
    comments: [{}]
});