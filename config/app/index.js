'use strict';

const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

module.exports = function(data) {
    let app = express();

    app.set('view engine', 'pug');
    app.use('/static', express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({ secret: 'purple unicorn' }));
    
    require('../passport')(app, data);

    return app;
};