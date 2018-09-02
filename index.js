'use strict';
var path = require('path');
var testEnvPath = path.resolve('./.test.env');

process.env.NODE_ENV === 'test' ?
  require('dotenv').config({
    path: testEnvPath,
  }) :
  require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
require('./src/routes/index')(app);

// const db = require('./db');


const port = process.env.NODE_ENV === 'test' ? 4444 : process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});

module.exports = app;
