'use strict'
// const _ = require('lodash')
const Model = require('./Model')
class Answer extends Model {

  constructor(obj) {
    super(obj)
  }
}
Answer.table = "answers"
Answer.fields = ['id', 'user_id', 'question_id', 'body', 'votes', 'created_at', 'updated_at']
module.exports = Answer