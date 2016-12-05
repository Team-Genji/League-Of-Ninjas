const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;
const crypto = require('crypto');

// if time left, extract model
module.exports.register = function(name, schemaProperties) {
    if (name === 'User') {
        let schema = new MongooseSchema(schemaProperties, {
            timestamps: true
        });
        schema.virtual('password')
            .set(function(password) {
                this._password = password;
                this.salt = this.makeSalt();
                this.hashPass = this.encryptPassword(password);
            })
            .get(function() {
                return this._password;
            });

        schema.methods = {
            makeSalt() {
                return `${Math.round((new Date().valueOf() * Math.random()))}`;
            },
            encryptPassword(password) {
                if (!password) {
                    return '';
                }
                try {
                    return crypto
                        .createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex');
                } catch (err) {
                    return '';
                }
            },
            authenticatePassword(password) {
                return this.encryptPassword(password) === this.hashPass;
            }
        };


        mongoose.model(name, schema);
        return mongoose.model(name);
    }

    let schema = new MongooseSchema(schemaProperties, {
        timestamps: true
    });

    mongoose.model(name, schema);
    return mongoose.model(name);
};