var express = require('express');
var router = express.Router();
// ref https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

// Require controller modules.
const QuestionController = new (require('../../../controllers/QuestionController'))();

/// BOOK ROUTES ///

// GET catalog home page.
// router.get('/', book_controller.index);

router.get('/', (req, res) => {
  res.send('Welcome to StackOverflow-Lite API')
})

router.get('/questions', QuestionController.index)

module.exports = router;