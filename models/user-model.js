/* globals require module  */
/* jshint esversion: 6 */

const modelRegistrator = require('./model-registrator');

module.exports = modelRegistrator.register('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});