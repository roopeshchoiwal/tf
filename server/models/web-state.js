import mongoose from 'mongoose';    
import RegexCheck from './utils/regexCheck';
import {Joi} from 'celebrate';
var webStateSchema = new mongoose.Schema({
  userRef: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  useremail: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  accessKey: String,
  examState:{
    exam: {
      type: String,
      match: RegexCheck.OBJECTID
    },
    attempted: Boolean,
    completed: Boolean,
    timeElapsed: Number, // in minutes
    duration: Number,
    questions: [{
      questionRef: {
        type: String,
        match: RegexCheck.OBJECTID
      },
      attempted: Boolean,
      pending: Boolean,
      inReview: Boolean,
      confirmed: Boolean,
      weightage: {
        type: Number,
        min: 0,
        max: 10
      },
      isCorrect: Boolean
    }]
  },
  sessionVars: {
    type: mongoose.SchemaTypes.Mixed
  }
}, {
  timestamps: true
});

const WebState = mongoose.model('WebState', webStateSchema);

WebState.validationKeys =  {
  _id: Joi.string().regex(RegexCheck.OBJECTID),
  userRef: Joi.string().regex(RegexCheck.OBJECTID),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }),
  username: Joi.string().alphanum().min(3).max(30),
  mobile: Joi.number().integer().min(10).max(25),
  accessKey: Joi.string(),
  examState:{
    exam: Joi.string().min(4).max(45),
    attempted: Joi.boolean(),
    completed: Joi.boolean(),
    expiryTime:Joi.date().iso(),
    startTime: Joi.date().iso(),
    questions: [{
      questionRef: Joi.string().regex(RegexCheck.OBJECTID),
      attempted: Joi.boolean(),
      pending: Joi.boolean(),
      inReview: Joi.boolean(),
      confirmed: Joi.boolean(),
      isCorrect: Joi.boolean(),
    }]
  },
};

module.exports = WebState;