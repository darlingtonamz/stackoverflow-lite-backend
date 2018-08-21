'use strict'
// const _ = require('lodash')
const { Pool, Client } = require('pg')
const initOptions = {/* initialization options */};
const pgp = require('pg-promise')();
// Preparing the connection details:
const connection = 'postgres://username:password@host:port/database';
const db = pgp(connection);

class Model {

  constructor(table) {
    this.table = ''
  }

  static async find(table, id) {
    // const pool = new Pool()
    // debugger

    // pool.query('SELECT * FROM $1 WHERE id = $2', [table, id], (err, res) => {
    //   pool.end()
    //   if (err) {
    //     console.log(err.stack)
    //     throw 'dfkjhdkfdfjh'
    //   } else {  return res.rows[0] }
    // })
    await db.any('SELECT * FROM ${table} WHERE id = ${id}', {table, id })
    .then((result) => {
      
    }).catch((err) => {
      throw err
    });
  }

  static shout() {
    console.log('KDJFHDJFHDFJHDFJHDFJDBFJHDFBJHDBJHDFHJDFB')
  }
}

module.exports = Model