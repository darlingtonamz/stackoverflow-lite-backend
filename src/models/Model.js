'use strict';

const _ = require('lodash');
const pgp = require('pg-promise')();

const db = require('../../db');

class Model {

  constructor(obj) {
    this.assignFields(obj);
    // this.table = table
  }

  static async find(id) {
    return this.findBy('id', id);
  }

  static async findBy(column, id) {
    // const self = this
    return db
      .any('SELECT * FROM ' + this.table + ' WHERE ' + column + ' = $1', [id])
      .then(data => {
        return data[0] ? this.new(data[0]) : null;
      })
      .catch(() => null);
  }

  static async where(key, value, clause = `${key} = $1`) {
    return await db
      .any('SELECT * FROM ' + this.table + ' WHERE ' + clause, [value])
      .then(async(array) => {
        // debugger
        let objArray = [];
        await array.forEach(async(obj) => {
          objArray.push(await this.new(obj));
        });
        return objArray;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async all() {
    return await db.any('SELECT * FROM ' + this.table, [])
      .then(async(array) => {
        let objArray = [];
        await array.forEach(async(obj) => {
          objArray.push(await this.new(obj));
        });
        return objArray;
      })
      .catch((err) => {
        throw err;
      });
  }

  async add(obj) {
    const model = this.constructor; // eg User
    obj = _.pickBy(_.pick(obj, model.fields), _.identity);
    // debugger
    const table = model.table;
    // debugger
    const self = this;
    const cs = new pgp.helpers.ColumnSet(Object.keys(obj), {table});
    const query = pgp.helpers.insert(obj, cs) + 'RETURNING id';

    return await db.one(query)
      .then(async(result) => {
        await self.afterSave();
        const newObj = await model.find(result.id);
        return newObj;
      });
  }

  async delete() {
    const model = this.constructor;
    const table = model.table;

    return await db
      .any('DELETE FROM ' + table + ' WHERE id = $1 RETURNING id', [this.id])
      .then(() => true)
      .catch((err) => {
        throw err;
      });
  }

  async update(){
    const model = this.constructor;
    const table = model.table;
    let keyval = '';
    let values = [];
    const self = this;

    const obj = _.pickBy(_.pick(this, model.fields), _.identity);

    _.forEach(Object.keys(obj), (field) => {
      values.push(this[field]);
      keyval += `${
        keyval.length > 0 ? ', ' : ''
      }${field} = $${values.length + 1}`;
    });
    // debugger
    return await db.any('UPDATE ' + table + ' SET ' + keyval + ' WHERE id = $1',
      _.concat(this.id, values))
      .then(async() => {
        await self.afterSave();
        return await model.find(this.id);
      })
      .catch((err) => {
        throw err;
      });
  }

  async afterSave() {

  }

  merge(obj){
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
  }

  async hasMany(model,
    pk = 'id',
    fk = `${
      this.constructor.table.substring(0, this.constructor.table.length - 1)
    }_${pk}`) {
    const childModel = require(`./${model}`);
    return db
      .any('SELECT * from ' + childModel.table + ' where ' + fk + ' = $1',
        [this[pk]])
      .then(async(array) => {
        let objArray = [];
        await array.forEach(async(obj) => {
          objArray.push(await childModel.new(obj));
        });
        return objArray;
      })
      .catch((err) => {
        throw err;
      });
  }

  async belongsTo(model,
    pk = `${
      this.constructor.table.substring(0, this.constructor.table.length - 1)
    }_${fk}`,
    fk = 'id') {
    const parentModel = require(`./${model}`);

    return db
      .any('SELECT * from ' + parentModel.table + ' where ' + fk + ' = $1',
        [this[pk]])
      .then(async(data) => {
        return data[0] ? await parentModel.new(data[0]) : null;
      })
      .catch(() => null);

  }

  static async new(obj) {
    const permittedFields = _.pick(obj, this.fields);
    const Model = require(`./${this.name}`);
    // debugger
    return await new Model(permittedFields);
  }

  async save() {
    if (this.$attributes.id) {
      // update
      this['updated_at'] = new Date();
      return this.update();
    } else {
      // append / create
      if (!this['created_at'])
        this['created_at'] = new Date();
      if (!this['updated_at'])
        this['updated_at'] = new Date();

      return await this.add(this);
    }
  }

  static async create(obj) {
    return this.new(obj)
      .then(async(result) => {
        const out = await result.save();
        return out;
      });
  }

  assignFields(obj) {
    const fields = this.constructor.fields;

    this.$attributes = obj;
    _.forEach(fields, (field) => {
      this[field] = obj[field];
    });
  }


  // hide unnessary fields when converting object to JSON
  toJSON() {
    return _.pick(this, this.constructor.fields);
  }

}

module.exports = Model;
