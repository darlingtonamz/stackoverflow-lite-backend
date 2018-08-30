'use strict'

const AnswerVote = require('../models/AnswerVote')
const ApplicationController = require('./ApplicationController')

class AnswerVoteController extends ApplicationController{
  // async index (req, res) {
  //   const answer = req.body.parentModel
  //   // const answerVotes = await AnswerVote.where('answer_id', answer.id)
  //   const answerVotes = await answer.answerVotes()
    
  //   res.status(200).json({
  //     message: "AnswerVote list",
  //     data: answerVotes
  //   })  
  // }

  async create (req, res) {
    const answer = req.body.parentModel
    const existingVote = await AnswerVote.findExisting(answer.id, req.user.id)

    if(existingVote){
      existingVote.merge(answerVoteParams(req))
      await existingVote.save()
        .then((result) => {
          res.status(200).json({
            message: "Successfully updated AnswerVote",
            data: result
          })
        }).catch((err) => {
          res.status(422).json({
            message: err.message || "Failed updating AnswerVote",
            data: err
          })
        });   
    } else {
      let newAnswerVote =  answerVoteParams(req)
      newAnswerVote['answer_id'] = answer.id
      newAnswerVote['user_id'] = req.user.id
      await AnswerVote.create(newAnswerVote)
        .then((result) => {
          // debugger
          res.status(200).json({
            message: "Successfully created AnswerVote",
            data: result
          })
        }).catch((err) => {
          res.status(422).json({
            message: err.message || "Failed creating AnswerVote",
            data: err
          })
        });    
    }
  }

  // async show (req, res) {
  //   const answerVote = req.body.model

  //   res.status(200).json({
  //     message: "Successfully found AnswerVote",
  //     data: answerVote
  //   })
  // }
  
  // async destroy (req, res) {
  //   // authorise
  //   const answerVote = req.body.model

  //   answerVote.delete()
  //     .then((result) => {
  //       res.status(200).json({
  //         message: "Successfully deleted AnswerVote",
  //         data: result
  //       })
  //     }).catch((err) => {
  //       res.status(422).json({
  //         message: err.message || "Failed deleting AnswerVote",
  //         data: err
  //       })
  //     });

  // }
}

function answerVoteParams(request) {
  const fields = ['value']
  return ApplicationController.getParams(request.body, fields)
}

module.exports = AnswerVoteController
