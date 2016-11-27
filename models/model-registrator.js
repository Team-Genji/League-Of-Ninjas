/*globals require module  */
/*jshint esversion: 6 */

const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema;

module.exports.register = function(name, schemaProperties) {
    let schema = new mongooseSchema(schemaProperties, {
        timestamps: true
    });

    mongoose.model(name, schema);
    return mongoose.model(name);
};