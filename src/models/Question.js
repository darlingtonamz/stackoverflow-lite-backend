'use strict'
// const _ = require('lodash')
const Model = require('./Model')
class Question extends Model {

  constructor(obj) {
    super(obj)
  }

  answers () { return this.hasMany('answers') }

  static async search(title, options = {}){
    let extra = ''
    if (options.keys) {
      options.keys.forEach(key => {
        extra += ` AND ${key} = '${options[key]}`
      });
    }
    
    // debugger
    return await (title ? 
      // this.where('lower(title)', title.toLowerCase(), 'like', `'%${title.toLowerCase()}%'`) : 
      this.where('lower(title)', title.toLowerCase(), `lower(title) like '%${title.toLowerCase()}%'${extra}`) : 
      this.all()
    )
  }

}
Question.table = "questions"
Question.fields = ['id', 'title', 'body', 'accepted_answer_id', 'user_id', 'created_at', 'updated_at']
module.exports = Question