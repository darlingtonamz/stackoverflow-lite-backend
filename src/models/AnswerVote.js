'use strict';
// const _ = require('lodash')
const Model = require('./Model');
const Answer = require('./Answer');

class AnswerVote extends Model {

  constructor(obj) {
    super(obj);
  }

  async afterSave() {
    // debugger
    // super.afterSave()
    await (await Answer.find(this['answer_id']))
      .updateVoteCount();
  }

  static async findExisting(answerId, userId) {
    const votes = await this.where(null, null,
      `answer_id = '${answerId}' AND user_id = '${userId}'`);
    return votes ? votes[0] : null;
  }
}
AnswerVote.table = 'answer_votes';
AnswerVote.fields = [
  'id', 'user_id', 'answer_id', 'value', 'created_at', 'updated_at'];
module.exports = AnswerVote;
