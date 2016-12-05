const modelRegistrator = require('../utils/model-registrator');
const minForumNameLength = 10;
const maxForumNameLength = 50;

module.exports = modelRegistrator.register('Forum', {
    name: {
        type: String,
        required: true,
        unique: false,
        minlength: [minForumNameLength, 'Forum name is too short!'],
        maxlength: [maxForumNameLength, 'Forum name is too long!']
    },
    // _id, name
    topics: [{}]
});