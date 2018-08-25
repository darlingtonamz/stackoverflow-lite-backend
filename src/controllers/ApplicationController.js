'use strict'
const _ = require('lodash')
class ApplicationController {  

  static getParams(queries, fields){
    var obj = _.pick(queries, fields)
    // debugger
    Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
    return obj
  }
}

module.exports = ApplicationController
