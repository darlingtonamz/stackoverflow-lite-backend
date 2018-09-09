'use strict';
// const _ = require('lodash')
const Model = require('./Model');
const User = require('./User');

class Answer extends Model {

  constructor(obj) {
    super(obj);
  }

  async afterSave() {
    // debugger
    // super.afterSave()
    await (await User.find(this['user_id']))
      .updateAnswerCount();
  }

  async updateVoteCount() {
    const answerVotes = await this.answerVotes();
    // debugger
    let count = 0;
    answerVotes.forEach(vote => {
      count += vote.value;
    });
    this.votes = count;
    await this.save();
  }

  async answerVotes() { return this.hasMany('AnswerVote'); }
  async comments() { return this.hasMany('AnswerComment'); }

}
Answer.table = 'answers';
Answer.fields = [
  'id', 'user_id', 'question_id', 'body', 'votes', 'created_at', 'updated_at'];
module.exports = Answer;
