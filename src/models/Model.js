'use strict'
// const _ = require('lodash')
const { Pool, Client } = require('pg')
const initOptions = {/* initialization options */};
const pgp = require('pg-promise')();
// Preparing the connection details:
const connection = 'postgres://postgres:hisgrace@localhost:5432/stackoverflow-lite';
const db = pgp(connection);

class Model {

  constructor(table) {
    this.table = table
  }

  static async find(id) {
    const self = this
    await db.any('SELECT * FROM ${this.table} WHERE id = ${id}', {table, id })
    .then((result) => {
      return result
    }).catch((err) => {
      throw err
    });
    
    // db.one('SELECT $1 AS value', 123)
    // .then(function (data) {
    //   console.log('DATA:', data.value, self.table)
    // })
    // .catch(function (error) {
    //   console.log('ERROR:', error)
    // })
  }

  static async where(key, value) {
    await db
  }

  add(obj) {
    // return db.one('INSERT INTO users(name) VALUES($1) RETURNING id', name, a => a.id);
    const fieldsText = 'name'
    
    _.forEach(this.fields, (field)=> {
      if (data[field]) {
        fieldsText += `${fieldsText.length > 0 ? '' : ', '}${field}`
      }
    })
    return db.one(`INSERT INTO $1(${fields}) VALUES($1) RETURNING id`, {table: this.table, obj}, a => a.id);
  }

  remove(id) {
    // return db.none('DELETE FROM users WHERE id = $1', id);
    return db.none('DELETE FROM $1 WHERE id = $2', {table: this.table, id});
  }

  static async update(id, data){
    /*
      UPDATE table_name
      SET column1 = value1, column2 = value2...., columnN = valueN
      WHERE [condition];
    */
    // this.fields = 
    
    let keyval = ''
    _.forEach(this.fields, (field)=> {
      if (data[field]) {
        keyval += `${keyval.length > 0 ? '' : ', '}${field} = ${data[field]}`
      }
    })
    return db.one(`UPDATE $1 SET ${keyval} WHERE id = $2`, {table: this.table, id});
  }

  static hasMany(table, pk = 'id', fk = `${table.substring(0, table.length - 1)}_${pk}`) {
    return db.many(`SELECT * from ${table} where ${fk} = ${this[pk]}`, {}, array => array)
  }

  static belongsTo(table, pk = `${table.substring(0, table.length - 1)}_${fk}`, fk = 'id') {
    return db.one(`SELECT * from ${table} where ${fk} = ${this[pk]}`, {}, array => array[0])

  }

  // static shout() {
  //   console.log('KDJFHDJFHDFJHDFJHDFJDBFJHDFBJHDBJHDFHJDFB')
  // }
}

module.exports = Model