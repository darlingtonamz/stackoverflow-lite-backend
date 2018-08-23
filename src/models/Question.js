'use strict'
// const _ = require('lodash')
const Model = require('./Model')
class Question extends Model {

  constructor(table) {
    this.table = 'questions'
  }

  // static async find(id) {
  //   // debugger
  //   return await super.find('questions', id)
  //   // .then((result) => {
  //   //   debugger
  //   // }).catch((err) => {
  //   //   debugger
      
  //   // });
  // }
}

Question.table = "questions"
Question.fields = []
module.exports = Question