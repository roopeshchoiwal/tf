import mongoose from 'mongoose';   
import RegexCheck from './utils/regexCheck'; 
import {Joi} from 'celebrate';

var questionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  questionNote: {
    type: String
  },
  questionType: {
    type: String,
    required: true,
    enum: ["Multiple Choice & Answer", "Multiple Choice Single Answer", "True/False", "Number"]
  },
  options: [String],
  hint: {
      type: String
  },
  solution: String,
  correctAnswer: [String],
  qustionTags: [String],
  qGroupRef: String,
  weightage: Number,
  index: Number,
  creatorRef: {
      type: String,
      match: RegexCheck.OBJECTID
  },
  examRef: {
    type: String,
    match: RegexCheck.OBJECTID
  },
  weightage:Number,
}, {
  timestamps: true,
  validateModifiedOnly: true
});

const Questions = mongoose.model('Questions', questionsSchema);

Questions.validationKeys = {
  question: Joi.string().min(4).max(1500),
  questionNote: Joi.string().min(2).max(500),
  questionType: Joi.string(), 
  options: Joi.array().items(Joi.string().min(1).max(500)),
  hint: Joi.string().min(4).max(1200),
  solution: Joi.string().min(1).max(2500),
  correctAnswer: Joi.array().items(Joi.string().min(1).max(500)),
  questionTags: Joi.array().items(Joi.string().alphanum().min(2).max(50)),
  qGroupRef: Joi.string().regex(RegexCheck.OBJECTID),
  index: Joi.number().integer().min(0).max(200),
  creatorRef: Joi.string().regex(RegexCheck.OBJECTID),
  examRef: Joi.string().regex(RegexCheck.OBJECTID),
  weightage: Joi.number().integer().min(1).max(100),
  _id: Joi.string().regex(RegexCheck.OBJECTID)
};

module.exports = Questions;