'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sortAnswers = (a,b) => {
  if(a.votes === b.votes){
    return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
}

var AnswerSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default:0}
});

AnswerSchema.method('update', (updates, callback) => {
  Object.assign(this, updates, {updatedAt: new Date()});
  this.parent().save(callback);
});

AnswerSchema.method('vote', (vote, callback) => {
  if(vote === 'up'){
    this.vote++;
  }else {
    this.vote--;
  }
});



var QuestionSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema]
});

QuestionSchema.pre('save', () => {
  this.answers.sort(sortAnswers);
  next();
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;
