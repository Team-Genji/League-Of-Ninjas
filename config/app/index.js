'use strict';

const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'purple unicorn' }));

require('../passport/')(app);
require('../../routers/user-routes')(app);

module.exports = app;