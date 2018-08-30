'use strict'
// const _ = require('lodash')
const Model = require('./Model')
class Answer extends Model {

  constructor(obj) {
    super(obj)
  }

  async updateVoteCount() {
    const votes = await this.votes()
    // debugger
    let count = 0
    votes.forEach(vote => {
      count += vote.value
    });
    this.votes = count
    await this.save()
  }

  async votes () { return this.hasMany('AnswerVote') }
  async comments () { return this.hasMany('AnswerComment') }

}
Answer.table = "answers"
Answer.fields = ['id', 'user_id', 'question_id', 'body', 'votes', 'created_at', 'updated_at']
module.exports = Answer