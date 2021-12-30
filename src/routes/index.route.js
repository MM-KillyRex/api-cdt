/*
const express = require('express');

const hasAPIKey = require('../middlewares/verifyAPIkey.handler');

const app = express();

app.use(hasAPIKey);

app.use(require('./reports.route'));

module.exports = app;

*/

const express = require('express')
const app = express()

app.use(require('./reports.route'))


module.exports = app
