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
        res.status(201).json({
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
    let answer = req.body.model
    answer.merge(answerParams(req))
    const isAnswerOwner = req.user.id == answer['user_id']
    
    super.authorise({req, res}, isAnswerOwner, () => {
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
    }, {
      message: "Access denied: Only owner can edit this answer"
    })
  }

  async markAnswer (req, res) {
    let answer = req.body.model
    let question = req.body.parentModel
    const isQuestionOwner = req.user.id == question['user_id']
    
    super.authorise({req, res}, isQuestionOwner, () => {
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
    }, {
      message: "Access denied: Only Question owner can mark correct answer"
    })
  }
  
  async destroy (req, res) {
    // authorise
    const answer = req.body.model

    const isAnswerOwner = req.user.id == answer['user_id']
    
    super.authorise({req, res}, isAnswerOwner, () => {
      answer.delete()
        .then((result) => {
          res.status(200).json({
            message: "Successfully deleted Answer",
            data: answer.id
          })
        }).catch((err) => {
          res.status(422).json({
            message: err.message || "Failed deleting Answer",
            data: err
          })
        });
    }, {
      message: "Access denied: Only the owner can delete this answer"
    })
  }
}

function answerParams(request) {
  const fields = ['body']
  return ApplicationController.getParams(request.body, fields)
}

module.exports = AnswerController
