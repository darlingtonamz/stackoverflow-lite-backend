var express = require('express');
var router = express.Router();
// ref https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

// Require controller modules.
const QuestionController = new (require('../../../controllers/QuestionController'))();
const AuthController = new (require('../../../controllers/AuthController'))();
const UserController = new (require('../../../controllers/UserController'))();
const auth = require('../../../middlewares/auth');

router.get('/', (req, res) => {
  res.send('Welcome to StackOverflow-Lite API')
})

router.post('/login', AuthController.login)
router.post('/register', UserController.create)

// router.all('/questions/:id', Model.findItem)
router.all('/questions', auth)
router.get('/questions', QuestionController.index)
router.get('/questions/:id', QuestionController.show)
router.post('/questions', QuestionController.create)
router.patch('/questions/:id', QuestionController.update)
router.delete('/questions/:id', QuestionController.destroy)

module.exports = router;