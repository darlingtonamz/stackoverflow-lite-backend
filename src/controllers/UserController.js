'use strict'

const User = require('../models/User')
const ApplicationController = require('./ApplicationController')

class UserController extends ApplicationController{
  async index (req, res) {    
  }

  async create (req, res) {
    await User.create(userParams(req))
      .then((result) => {
        res.status(200).json({
          message: "Successfully created User",
          data: result
        })
      }).catch((err) => {
        res.status(422).json({
          message: "Failed creating User",
          data: err
        })
      });
  }

  async show (req, res) {
    
  }

  async update (req, res) {
    
  }

  async destroy (req, res) {
  }
}

function userParams(request) {
  const fields = ['fname', 'lname', 'email', 'password']
  return ApplicationController.getParams(request.body, fields)
}

module.exports = UserController
