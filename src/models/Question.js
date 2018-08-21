'use strict'
// const _ = require('lodash')
const Model = require('./Model')
class Question extends Model {

  constructor(table) {
    this.table = ''
  }

  static async find(id) {
    // debugger
    return await super.find('questions', id)
    // .then((result) => {
    //   debugger
    // }).catch((err) => {
    //   debugger
      
    // });
  }
}

module.exports = Question