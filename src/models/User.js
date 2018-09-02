'use strict';

const bcrypt = require('bcrypt');
const Model = require('./Model');
class User extends Model {

  constructor(obj) {
    super(obj);
  }

  async comparePassword(password) {
    // debugger
    return bcrypt.compareSync(password, this.password);
  }

  async questions() { return this.hasMany('Question'); }
}

User.table = 'users';
User.fields = [
  'id', 'fname', 'lname', 'email', 'password', 'created_at', 'updated_at'];
module.exports = User;
