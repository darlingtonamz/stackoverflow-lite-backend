'use strict';
const pgp = require('pg-promise')();
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
  DATABASE_URL,
} = process.env;

const connection = (DATABASE_URL !== undefined) ?
  DATABASE_URL : `postgres://${DB_USER}:${
    DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE
  }`;

const db = pgp(connection);

module.exports = db;
