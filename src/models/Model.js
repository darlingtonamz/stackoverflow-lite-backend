'use strict'
const _ = require('lodash')
const { Pool, Client } = require('pg')
const initOptions = {/* initialization options */};
const pgp = require('pg-promise')();
// Preparing the connection details:
const connection = 'postgres://postgres:hisgrace@localhost:5432/stackoverflow-lite';
const db = pgp(connection);

class Model {

  constructor(obj) {
    this.assignFields(obj)
    // this.table = table
  }

  static async find(id) {
    // const self = this
    // debugger
    return db.any('SELECT * FROM '+ this.table +' WHERE id = $1', [id])    
    .then(data => data[0])
    .catch((err) => null );
  }

  static async findBy(column, id) {
    // const self = this
    return db.any('SELECT * FROM ' + this.table +' WHERE ' + column + ' = $1', [id])
    .then(data => data[0])
    .catch((err) => null );
  }

  static async where(key, value) {
    // await db
  }

  async add(obj) {
    // return db.one('INSERT INTO users(name) VALUES($1) RETURNING id', name, a => a.id);
    const fields = this.constructor.fields
    // let fieldsText = ''
    // debugger
    // _.forEach(fields, (field)=> {
    //   if (obj[field]) {
    //     fieldsText += `${fieldsText.length > 0 ? ', ' : ''}${field}`
    //   }
    // })

    // debugger
    // const cs = new pgp.helpers.ColumnSet(['col_a', 'col_b'], {table: 'tmp'});
    const model = this.constructor
    const table = model.table
    // debugger
    const cs = new pgp.helpers.ColumnSet(Object.keys(obj), {table});
    // const values = [obj];
    // debugger
    const query = pgp.helpers.insert(obj, cs) + 'RETURNING id';
    // debugger
    // return db.one(`INSERT INTO $1(${fields}) VALUES($1) RETURNING id`, {table: this.table, obj})
    return await db.one(query)
    .then(async (result) => {
      const newObj = await model.find(result.id)
      debugger 
      return newObj
    })
    .catch((err) => {
      throw err
      // console.log(err)
    } );
  }

  remove(id) {
    // return db.none('DELETE FROM users WHERE id = $1', id);
    return db.none('DELETE FROM $1 WHERE id = $2', {table: this.table, id});
  }

  static async update(id, data){
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

  static async new (obj) {
    const permittedFields = _.pick(obj, this.fields)
    const Model = require(`./${this.name}`)
    // debugger
    return new Model(permittedFields)
  }

  save() {
    // debugger
    if (this.$attributes.id) {
      // update 
    } else {
      // debugger
      // append / create
      return this.add(this.$attributes)
      
    }
  }

  static create (obj) {
    // const newObj = 
    return this.new(obj)
    .then((result) => {
      // debugger
      return result.save()
    })
    // .catch((err) => {
    //   return err
    // });
    
    // debugger
  }

  assignFields(obj) {
    const fields = this.constructor.fields
    // debugger
    this.$attributes = obj
    _.forEach(fields, (field)=> {
      this[field] = obj[field]
    })
  }

}

module.exports = Model