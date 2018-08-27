'use strict'
// const _ = require('lodash')
const Model = require('./Model')
class Question extends Model {

  constructor(obj) {
    super(obj)
  }

  answers () { hasMany('answers') }

}
Question.table = "questions"
Question.fields = ['id', 'title', 'body', 'accepted_answer_id', 'user_id', 'created_at', 'updated_at']
module.exports = Question