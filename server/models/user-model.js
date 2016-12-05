const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('User', {
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'username is too short!'],
        maxlength: [50, 'username is too long!']
    },
    salt: String,
    hashPass: String,
    avatarUrl: {
        type: String
    },
    role: {
        type: String,
        default: 'normal'
    }
});