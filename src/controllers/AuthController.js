'use strict'

const User = require('../models/User')
const ApplicationController = require('./ApplicationController')
const jwt = require('jsonwebtoken')

class AuthController extends ApplicationController{
  async login (req, res) {
    const user = await User.findBy('email', req.body.email)
    if (user) {
      const isValid = user.comparePassword(req.body.password)
      if (isValid) {
        return res.status(200).json({
          token: jwt.sign(user, process.env.JWT_SECRET)
        })
      } else {
        res.status(401).json({
          message: 'Authentication failed. Wrong password.'
        })
      }
    } else {
      res.status(401).json({
        message: 'Authentication failed. User not found.'
      })
    }
  }

  async register (req, res) {
    
  }

  // async show (req, res) {
    
  // }

  // async update (req, res) {
    
  // }

  // async destroy (req, res) {
  // }
}

// function agentParams(request) {
//   const fields = ['fname', 'lname', 'phone', 'password', 'organization_role_id']
//   return ApplicationController.getParams(request.post(), fields)
// }

module.exports = AuthController
