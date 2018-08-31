'use strict'
const bcrypt = require('bcrypt');
const User = require('../models/User')
const ApplicationController = require('./ApplicationController')

class UserController extends ApplicationController{
  async index (req, res) {    
  }

  async create (req, res) {
    let newUser =  userParams(req)
    // debugger
    const salt = 10
    newUser.password = bcrypt.hashSync(req.body.password, salt);
    // debugger
    await User.create(newUser)
      .then((result) => {
        res.status(201).json({
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
    const user = await User.find(req.params.id)

    if (user){   
      res.status(200).json({
        message: "Successfully found User",
        data: user
      })
    } else {
      res.status(404).json({
        message: "User not found",
      })      
    }
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
