'use strict';
// const _ = require('lodash')
const Model = require('./Model');
const User = require('./User');

class Question extends Model {

  constructor(obj) {
    super(obj);
  }


  static async search(title, options = {}){
    let extra = '';
    if (options.keys) {
      options.keys.forEach(key => {
        extra += ` AND ${key} = '${options[key]}`;
      });
    }

    return await (title ?
      this.where(
        'lower(title)',
        title.toLowerCase(),
        `lower(title) like '%${title.toLowerCase()}%'${extra}`) :
      this.all()
    );
  }

  async afterSave() {
    // debugger
    // super.afterSave()
    await (await User.find(this['user_id']))
      .updateQuestionCount();
  }

  async answers() { return this.hasMany('Answer'); }
  async user() { return this.belongsTo('User'); }
}
Question.table = 'questions';
Question.fields = [
  'id', 'title', 'body', 'accepted_answer_id',
  'user_id', 'created_at', 'updated_at'];
module.exports = Question;
