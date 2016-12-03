const modelRegistrator = require('../utils/model-registrator');
const minForumNameLength = 5;
const maxForumNameLength = 20;

module.exports = modelRegistrator.register('Forum', {
    name: {
        type: String,
        required: true,
        unique: false,
        minlength: [minForumNameLength, 'Forum name is too long!'],
        maxLength: [maxForumNameLength, 'Forum name is too short!']
    },
    // _id, name
    topics: [{}]
});