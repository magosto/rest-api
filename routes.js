'use strict'

var express = require('express');
var router = express.Router();

//GET /questions
router.get('/', (req, res) => {
  res.json({response: "You sent me a GET request"});
});

//POST /questions
router.post('/', (req, res) => {
  res.json({response: "You sent me a POST request",
  body: req.body
  });
});

//GET /questions/:qID
router.get('/:qID', (req, res) => {
  res.json({response: "You sent me a GET request for ID " + req.params.qID});
});

//POST /questions
router.post('/:qID/answers', (req, res) => {
  res.json({response: "You sent me a POST request to /answers",
  questionID: req.params.qID,
  body: req.body

  });
});

//PUT /questions/:qID/answer/:aID
//edit a specific answer
router.put('/:qID/answers/:aID', (req, res) => {
  res.json({response: "You sent me a PUT request to /answers",
  questionID: req.params.qID,
  answerID: req.params.aID,
  body: req.body
  });
});

//DELETE /questions/:qID/answer/:aID
//delete a specific answer
router.delete('/:qID/answers/:aID', (req, res) => {
  res.json({response: "You sent me a DELETE request to /answers",
  questionID: req.params.qID,
  answerID: req.params.aID
  });
});

//POST /questions/:qID/answer/:aID/vote-up
//POST /questions/:qID/answer/:aID/vote-down
//delete a specific answer
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
  if(req.params.dir.search(/up|down/) === -1) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
},(req, res) => {
  res.json({response: "You sent me a POST request to /vote" + req.params.dir,
  questionID: req.params.qID,
  answerID: req.params.aID,
  vote: req.params.dir
  });
});


module.exports = router;
