var express = require('express');
var router = express.Router();
// ref https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

// Require controller modules.
const QuestionController = new (require('../../../controllers/QuestionController'))();

router.get('/', (req, res) => {
  res.send('Welcome to StackOverflow-Lite API')
})

// router.all('/questions/:id', Model.findItem)
router.get('/questions', QuestionController.index)
router.get('/questions/:id', QuestionController.show)
router.post('/questions', QuestionController.store)
router.patch('/questions/:id', QuestionController.update)
router.delete('/questions/:id', QuestionController.destroy)

module.exports = router;