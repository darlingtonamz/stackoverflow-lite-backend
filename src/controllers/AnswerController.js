'use strict'

const Answer = require('../models/Answer')
const ApplicationController = require('./ApplicationController')

class AnswerController extends ApplicationController{
  async index (req, res) {
    const question = req.body.parentModel
    // const answers = await Answer.where('question_id', question.id)
    const answers = await question.answers()
    
    res.status(200).json({
      message: "Answer list",
      data: answers
    })  
  }

  async create (req, res) {
    let newAnswer =  answerParams(req)
    const question = req.body.parentModel
    newAnswer['question_id'] = question.id
    newAnswer['user_id'] = req.user.id

    // debugger
    await Answer.create(newAnswer)
      .then((result) => {
        // debugger
        res.status(200).json({
          message: "Successfully created Answer",
          data: result
        })
      }).catch((err) => {
        res.status(422).json({
          message: err.message || "Failed creating Answer",
          data: err
        })
      });    
  }

  async show (req, res) {
    const answer = req.body.model

    res.status(200).json({
      message: "Successfully found Answer",
      data: answer
    })
  }

  async update (req, res) {
    // authorise
    let answer = req.body.model
    answer.merge(answerParams(req))
    answer.save()
      .then((result) => {
        res.status(200).json({
          message: "Successfully updated Answer",
          data: result
        })
      }).catch((err) => {
        res.status(422).json({
          message: err.message || "Failed updating Answer",
          data: err
        })
      });
  }

  async markAnswer (req, res) {
    let answer = req.body.model
    let question = req.body.parentModel
    if (req.user.id == question['user_id']) {
      question.merge({
        accepted_answer_id: answer.id
      })
      question.save()
        .then((result) => {
          res.status(200).json({
            message: "Answer marked as correct",
            data: result
          })
        }).catch((err) => {
          res.status(422).json({
            message: err.message || "Failed marking Answer",
            data: err
          })
        });
    } else {
      res.status(401).json({
        message: "Access denied: Only Question owner can mark correct answer"
      })      
    }
  }
  
  async destroy (req, res) {
    // authorise
    const answer = req.body.model

    answer.delete()
      .then((result) => {
        res.status(200).json({
          message: "Successfully deleted Answer",
          data: result
        })
      }).catch((err) => {
        res.status(422).json({
          message: err.message || "Failed deleting Answer",
          data: err
        })
      });

  }
}

function answerParams(request) {
  const fields = ['body']
  return ApplicationController.getParams(request.body, fields)
}

module.exports = AnswerController
