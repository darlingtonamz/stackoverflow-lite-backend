'use strict'
// const _ = require('lodash')
const Model = require('./Model')
const Answer = require('./Answer')

class AnswerComment extends Model {

  constructor(obj) {
    super(obj)
  }

  async afterSave () {
  }
}
AnswerComment.table = "answer_comments"
AnswerComment.fields = ['id', 'user_id', 'answer_id', 'body', 'created_at', 'updated_at']
module.exports = AnswerComment