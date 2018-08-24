'use strict'
// const _ = require('lodash')
const Model = require('./Model')
class User extends Model {

  constructor(table) {
    this.table = 'users'
  }

  questions () { hasMany('questions') }
}

User.table = "users"
User.fields = []
module.exports = User