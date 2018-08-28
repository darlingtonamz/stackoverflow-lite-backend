var express = require('express');
var router = express.Router();
// ref https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

// Require controller modules.
const QuestionController = new (require('../../../controllers/QuestionController'))();
const AuthController = new (require('../../../controllers/AuthController'))();
const UserController = new (require('../../../controllers/UserController'))();
const auth = require('../../../middlewares/auth');
const findItem = require('../../../middlewares/findItem');

router.get('/', (req, res) => {
  res.send('Welcome to StackOverflow-Lite API')
})

router.post('/login', AuthController.login)
router.post('/register', UserController.create)

// router.all('/users/:id', auth)
router.get('/users/:id', UserController.show)

// router.all('/questions/:id', Model.findItem)
router.get('/questions', QuestionController.index)
router.all('/questions/:id', findItem('Question'))
router.get('/questions/:id', QuestionController.show)
router.all('/questions*', auth)
router.post('/questions', QuestionController.create)
router.patch('/questions/:id', QuestionController.update)
router.delete('/questions/:id', QuestionController.destroy)

router.get('/answers', AnswerController.index)
router.all('/answers/:id', findItem('Answer'))
router.get('/answers/:id', AnswerController.show)
router.all('/answers*', auth)
router.post('/answers', AnswerController.create)
router.patch('/answers/:id', AnswerController.update)
router.delete('/answers/:id', AnswerController.destroy)
// /questions/<questionId>/answers/<answerId

module.exports = router;