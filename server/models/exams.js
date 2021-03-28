import mongoose from 'mongoose';    
import {Joi} from 'celebrate';
import RegexCheck from '../models/utils/regexCheck';

var examsSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    uppercase: true,
    unique: true
  },
  examDescription: {
    type: String,
    required: true
  },
  examTags: [{
    type: String,
    uppercase: true
  }],
  totalQuestions: {
    type: Number
  },
  totalMarks: {
    type: Number
  },
  duration: {
    // in minutes
    type: Number
  },
  negativeMarking: {
    type: Boolean
  },
  negativeWeightage: {
    type: Number,
    min: 1,
    max: 10
  },
  questions: [{
    questionRef: {
      type: mongoose.ObjectId
    },
    weightage: {
      type: Number,
      min: 1,
      max: 100
    }
  }],
  answers: [{
    questionRef: {
      type: mongoose.ObjectId
    },
    answer: [String]
  }],
  singlePage: {
    type: Boolean,
    default: true
  },
  isPublished: Boolean,
  creatorRef: {
      type: String
  }
  }, {
    timestamps: true,
    validateModifiedOnly: true
});



 
const Exams = mongoose.model('Exams', examsSchema);

let question = Joi.object().keys({
  questionRef: Joi.string().regex(RegexCheck.OBJECTID),
  weightage: Joi.number().integer().min(1).max(100)
});

let answer = Joi.object().keys({
  questionRef: Joi.string().regex(RegexCheck.OBJECTID),
  answer: Joi.array().items(Joi.string().max(1000)),
});

Exams.validationKeys = {
    examName: Joi.string().alphanum().min(4).max(45),
    examDescription: Joi.string().regex(RegexCheck.TEXT).min(6).max(500),
    examTags: Joi.array().items(Joi.string().alphanum().min(2).max(25)),
    totalQuestions: Joi.number().integer().min(1).max(250),
    totalMarks: Joi.number().integer().min(1).max(1000),
    duration: Joi.number().integer().min(1).max(300),
    negativeMarking: Joi.boolean(),
    negativeWeightage: Joi.number().integer().min(1).max(10),
    questions: Joi.array().items(question),
    answers: Joi.array().items(question),
    singlePage: Joi.boolean(),
    isPublished: Joi.boolean(),
    creatorRef: Joi.string().regex(RegexCheck.OBJECTID),
    _id: Joi.string().regex(RegexCheck.OBJECTID)
  };

module.exports = Exams;