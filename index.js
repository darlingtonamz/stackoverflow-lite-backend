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
// CORS
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin',
    'https://amz-sol-frontend.herokuapp.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, OPTIONS, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type,authorization');
  // Origin, X-Requested-With, Content-Type, Accept, Authorization

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

require('./src/routes/index')(app);

// const db = require('./db');


const port = process.env.NODE_ENV === 'test' ? 4444 : process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});

module.exports = app;
