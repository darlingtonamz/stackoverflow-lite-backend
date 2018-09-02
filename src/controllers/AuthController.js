'use strict';

const User = require('../models/User');
const ApplicationController = require('./ApplicationController');
const jwt = require('jsonwebtoken');

class AuthController extends ApplicationController {
  async login(req, res) {
    const user = await User.findBy('email', req.body.email);
    // debugger
    if (user) {
      const isValid = await user.comparePassword(req.body.password);
      if (isValid) {
        // debugger
        return res.status(200).json({
          user: user,
          token: jwt.sign(user.toJSON(), process.env.JWT_SECRET),
        });
      } else {
        res.status(401).json({
          message: 'Authentication failed. Wrong password.',
        });
      }
    } else {
      res.status(401).json({
        message: 'Authentication failed. User not found.',
      });
    }
  }

  async register(req, res) {

  }

  // async show (req, res) {

  // }

  // async update (req, res) {

  // }

  // async destroy (req, res) {
  // }
}

module.exports = AuthController;
