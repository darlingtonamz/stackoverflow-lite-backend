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
    return this.findBy('id', id)
  }

  static async findBy(column, id) {
    // const self = this
    return db.any('SELECT * FROM ' + this.table +' WHERE ' + column + ' = $1', [id])
    .then(data => {
      return data[0] ? this.new(data[0]) : null
    })
    .catch((err) => null );
  }

  // static async where(key, value, operator = '=', valueExpression = '$1') {    
  static async where(key, value, clause = `${key} = $1`) {     
    // return await db.any('SELECT * FROM '+ this.table +' WHERE ' + key +' '+ operator+' '+ valueExpression, [value])    
    return await db.any('SELECT * FROM '+ this.table +' WHERE ' + clause, [value])    
    .then(async (array) => {
      // debugger
      let objArray = []
      await array.forEach(async (obj) => {
        objArray.push(await this.new(obj))
      })
      return objArray
    })
    .catch((err) => {
      throw err
    });
  }

  static async all () {
    return await db.any('SELECT * FROM '+ this.table, [])    
    .then(async (array) => {
      let objArray = []
      await array.forEach(async (obj) => {
        objArray.push(await this.new(obj))
      })
      return objArray
    })
    .catch((err) => {
      throw err
    });
  }

  async add(obj) {
    // const fields = this.constructor.fields
    
    const model = this.constructor // eg User
    obj = _.pickBy(_.pick(obj, model.fields), _.identity)
    // debugger
    const table = model.table
    // debugger
    const cs = new pgp.helpers.ColumnSet(Object.keys(obj), {table});
    const query = pgp.helpers.insert(obj, cs) + 'RETURNING id';
    return await db.one(query)
    .then(async (result) => {
      const newObj = await model.find(result.id)
      return newObj
    })
    .catch((err) => {
      throw err
    });
  }

  async delete() {    
    const model = this.constructor 
    const table = model.table
    // return db.none('DELETE FROM users WHERE id = $1', id);
    return await db.none('DELETE FROM '+ table +' WHERE id = $1 RETURNING id', [this.id])
    .then((result) => this.id)
    .catch((err) => {
      throw err
    });
  }

  async update(){   
    const model = this.constructor 
    const table = model.table
    let keyval = ''
    let values = []
    
    const obj = _.pickBy(_.pick(this, model.fields), _.identity)

    _.forEach(Object.keys(obj), (field)=> {
      // if (this[field]) {
        values.push(this[field])
        keyval += `${keyval.length > 0 ? ', ' : ''}${field} = $${values.length + 1}`
      // }
    })
    // debugger
    return await db.any('UPDATE '+ table +' SET '+ keyval  +' WHERE id = $1', _.concat(this.id, values))
    .then(async () => {
      return await model.find(this.id)
    })
    .catch((err) => {
      throw err
    });
  }

  merge(obj){
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key]
    })
  }

  async hasMany(table, pk ='id', fk = `${this.constructor.table.substring(0, this.constructor.table.length - 1)}_${pk}`) {
    return db.any('SELECT * from '+ table +' where '+ fk +' = $1', [this[pk]])
    .then(async (array) => {      
      let objArray = []
      await array.forEach(async (obj) => {
        objArray.push(await this.constructor.new(obj))
      })
      return objArray
    })
    .catch((err) => {
      throw err
    });
  }

  static belongsTo(table, pk = `${table.substring(0, table.length - 1)}_${fk}`, fk = 'id') {
    return db.any('SELECT * from '+ table +' where '+ fk +' = $1', [this[pk]])
    .then(data => {
      return data[0] ? this.constructor.new(data[0]) : null
    })
    .catch((err) => null );

  }

  static async new (obj) {
    const permittedFields = _.pick(obj, this.fields)
    const Model = require(`./${this.name}`)
    // debugger
    return await new Model(permittedFields)
  }

  save() {
    // debugger
    if (this.$attributes.id) {
      // update 
      this['updated_at'] = new Date()
      return this.update()
    } else {
      // debugger
      // append / create
      if (!this['created_at']) 
        this['created_at'] = new Date()
      if (!this['updated_at'])
        this['updated_at'] = new Date()
      return this.add(this)
      
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


  // hide unnessary fields when converting object to JSON
  toJSON () {
    return _.pick(this, this.constructor.fields)
  }

}

module.exports = Model