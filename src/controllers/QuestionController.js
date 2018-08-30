'use strict'

const Question = require('../models/Question')
const ApplicationController = require('./ApplicationController')

class QuestionController extends ApplicationController{
  async index (req, res) {
    const questions = (
      req.params.user_id ? 
      await Question.search(req.query.title, {
        'user_id': req.user.id
      }) : 
      await Question.search(req.query.title)
    )
    // debugger
    res.status(200).json({
      message: "Question list",
      data: questions
    })  
  }

  async create (req, res) {
    let newQuestion =  questionParams(req)
    newQuestion['user_id'] = req.user.id
    // debugger
    await Question.create(newQuestion)
      .then((result) => {
        // debugger
        res.status(200).json({
          message: "Successfully created Question",
          data: result
        })
      }).catch((err) => {
        res.status(422).json({
          message: err.message || "Failed creating Question",
          data: err
        })
      });
    
  }

  async show (req, res) {
    const question = req.body.model

    res.status(200).json({
      message: "Successfully found Question",
      data: question
    })
  }

  async update (req, res) {
    // authorise
    let question = req.body.model
    question.merge(questionParams(req))
    question.save()
      .then((result) => {
        res.status(200).json({
          message: "Successfully updated Question",
          data: result
        })
      }).catch((err) => {
        res.status(422).json({
          message: err.message || "Failed updating Question",
          data: err
        })
      });
  }
  
  async destroy (req, res) {
    // authorise
    const question = req.body.model

    question.delete()
      .then((result) => {
        res.status(200).json({
          message: "Successfully deleted Question",
          data: question.id
        })
      }).catch((err) => {
        res.status(422).json({
          message: err.message || "Failed deleting Question",
          data: err
        })
      });

  }
}

function questionParams(request) {
  const fields = ['title', 'body']
  return ApplicationController.getParams(request.body, fields)
}

module.exports = QuestionController
