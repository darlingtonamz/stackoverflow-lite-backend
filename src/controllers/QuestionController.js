'use strict'

// const Question = use('App/Models/Question')
const ApplicationController = require('./ApplicationController')

class QuestionController extends ApplicationController{
  async index (req, res) {
    res.json({
      message: "Hello from QuestionController"
    })
    
  }

  async store (req, res) {
    
  }

  async show (req, res) {
    
  }

  async update (req, res) {
    
  }

  async destroy (req, res) {
  }
}

// function agentParams(request) {
//   const fields = ['fname', 'lname', 'phone', 'password', 'organization_role_id']
//   return ApplicationController.getParams(request.post(), fields)
// }

module.exports = QuestionController
