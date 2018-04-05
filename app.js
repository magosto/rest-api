'use strict';

var express = require('express');
var jasonParser = require('body-parser').json;
var logger = require('morgan');
var routes = require('./routes.js');
var app = express();

app.use(logger('dev'));
app.use(jasonParser());

app.use('/questions', routes);

//catch 404 errors and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      mess: err.message
    }
  });
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("express server is listening on port", port);
});
