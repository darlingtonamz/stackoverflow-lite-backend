'use strict'

const Question = require('../models/Question')
const ApplicationController = require('./ApplicationController')

class QuestionController extends ApplicationController{
  async index (req, res) {
    // const data = await Question.find(1)
    await Question.find(1)
    .then((result) => {
      // debugger
      res.status(200).json({
        message: "Hello from QuestionController",
        data: result
      })
      
    }).catch((err) => {
      // debugger
      res.status(422).json({
        message: "Something bad happened",
        data: err.message || err
      })
      
    });
    
  }

  async create (req, res) {
    
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
