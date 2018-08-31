const pgp = require('pg-promise')();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env
// debugger
const connection = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
// console.log("DB", connection);

const db = pgp(connection);

module.exports = db