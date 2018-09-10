'use strict';

const bcrypt = require('bcrypt');
const Model = require('./Model');
const _ = require('lodash');

class User extends Model {

  constructor(obj) {
    super(obj);
  }

  async comparePassword(password) {
    // debugger
    return bcrypt.compareSync(password, this.password);
  }

  async updateAnswerCount() {
    const answers = await this.answers();
    this.stats = _.merge(this.stats, {
      answerCount: answers.length,
    });
    await this.save();
    // debugger
  }

  async updateQuestionCount() {
    const questions = await this.questions();
    this.stats = _.merge(this.stats, {
      questionCount: questions.length,
    });
    await this.save();
    // debugger
  }

  async questions() { return this.hasMany('Question'); }
  async answers() { return this.hasMany('Answer'); }
}

User.table = 'users';
User.fields = [
  'id', 'fname', 'lname', 'email',
  'password', 'created_at', 'updated_at', 'stats'];
module.exports = User;
