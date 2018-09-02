'use strict';
var express = require('express');
var router = express.Router();

// Require controller modules.
const QuestionController = new (
  require('../../../controllers/QuestionController'))();
const AnswerController = new (
  require('../../../controllers/AnswerController'))();
const AnswerVoteController = new (
  require('../../../controllers/AnswerVoteController'))();
const AnswerCommentController = new (
  require('../../../controllers/AnswerCommentController'))();
const AuthController = new (
  require('../../../controllers/AuthController'))();
const UserController = new (
  require('../../../controllers/UserController'))();
const auth = require('../../../middlewares/auth');
const findItem = require('../../../middlewares/findItem');

router.get('/', (req, res) => {
  res.send('Welcome to StackOverflow-Lite API');
});

// ONBOARDING
router.post('/login', AuthController.login);
router.post('/register', UserController.create);

// USER
router.get('/users/:id', UserController.show);
router.get('/users/:id/questions', auth, QuestionController.index);

// QUESTIONS
router.get('/questions', QuestionController.index);
router.all('/questions/:id', findItem('Question'));
router.get('/questions/:id', QuestionController.show);
router.all('/questions*', auth);
router.post('/questions', QuestionController.create);
router.patch('/questions/:id', QuestionController.update);
router.delete('/questions/:id', QuestionController.destroy);

// ANSWERS
router.all('/questions/:question_id/answers*', auth,
  findItem('Question', 'question_id'));
router.get('/questions/:question_id/answers', AnswerController.index);
router.all('/questions/:question_id/answers/:id', findItem('Answer'));
router.get('/questions/:question_id/answers/:id', AnswerController.show);
router.post('/questions/:question_id/answers', AnswerController.create);
router.patch('/questions/:question_id/answers/:id', AnswerController.update);
router.delete('/questions/:question_id/answers/:id', AnswerController.destroy);

// MARK ANSWER AS ACCEPTED
// /questions/<questionId>/answers/<answerId>
router.put('/questions/:question_id/answers/:id', AnswerController.markAnswer);

// ANSWER VOTES
router.all('/answers/:answer_id/answer_votes*', auth,
  findItem('Answer', 'answer_id'));
router.put('/answers/:answer_id/answer_votes', AnswerVoteController.create);

// ANSWER COMMENTS
router.all('/answers/:answer_id/answer_comments*', auth,
  findItem('Answer', 'answer_id'));
router.get('/answers/:answer_id/answer_comments',
  AnswerCommentController.index);
router.post('/answers/:answer_id/answer_comments',
  AnswerCommentController.create);
router.all('/answers/:answer_id/answer_comments/:id',
  findItem('AnswerComment'));
router.get('/answers/:answer_id/answer_comments/:id',
  AnswerCommentController.show);
router.delete('/answers/:answer_id/answer_comments/:id',
  AnswerCommentController.destroy);

module.exports = router;
