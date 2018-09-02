'use strict';

const AnswerComment = require('../models/AnswerComment');
const ApplicationController = require('./ApplicationController');

class AnswerCommentController extends ApplicationController {
  async index(req, res) {
    const answer = req.body.parentModel;
    const answerComments = await answer.comments();
    res.status(200).json({
      message: 'AnswerComment list',
      data: answerComments,
    });
  }

  async create(req, res) {
    const answer = req.body.parentModel;

    let newAnswerComment = answerCommentParams(req);
    newAnswerComment['answer_id'] = answer.id;
    newAnswerComment['user_id'] = req.user.id;
    await AnswerComment.create(newAnswerComment)
      .then((result) => {
        // debugger
        res.status(201).json({
          message: 'Successfully created AnswerComment',
          data: result,
        });
      }).catch((err) => {
        res.status(422).json({
          message: err.message || 'Failed creating AnswerComment',
          data: err,
        });
      });

  }

  async show(req, res) {
    const answerComment = req.body.model;

    res.status(200).json({
      message: 'Successfully found AnswerComment',
      data: answerComment,
    });
  }

  async destroy(req, res) {
    const answerComment = req.body.model;

    answerComment.delete()
      .then((result) => {
        res.status(200).json({
          message: 'Successfully deleted AnswerComment',
          data: answerComment.id,
        });
      }).catch((err) => {
        res.status(422).json({
          message: err.message || 'Failed deleting AnswerComment',
          data: err,
        });
      });

  }
}

function answerCommentParams(request) {
  const fields = ['body'];
  return ApplicationController.getParams(request.body, fields);
}

module.exports = AnswerCommentController;
