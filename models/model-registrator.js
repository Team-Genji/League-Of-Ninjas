/* jshint esversion: 6 */

const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

module.exports.register = function(name, schemaProperties) {
    let schema = new MongooseSchema(schemaProperties, {
        timestamps: true
    });

    mongoose.model(name, schema);
    return mongoose.model(name);
};