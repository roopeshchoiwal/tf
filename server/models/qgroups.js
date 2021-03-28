import mongoose from 'mongoose';   
import RegexCheck from './utils/regexCheck'; 
import {Joi} from 'celebrate';
var qgroupsSchema = new mongoose.Schema({
  qGroup: {
    type: String,
    required: true
  },
  questionText: {
    type: String
  },
  questions: [{
    questionRef: {
      type: mongoose.ObjectId
    },
    weightage: {
      type: Number,
      min: 1,
      max: 10
    }
  }],
  tag: [String],
  index: Number,
  creatorRef: {
      type: String,
      match: RegexCheck.OBJECTID
  },
  examRef: {
    type: String,
    match: RegexCheck.OBJECTID
}
}, {
  timestamps: true
});

const QGroups = mongoose.model('QGroup', qgroupsSchema);

let question = Joi.object().keys({
  questionRef: Joi.string().regex(RegexCheck.OBJECTID),
  weightage: Joi.number().integer().min(1).max(10)
});

QGroups.validationKeys = {
  qGroup: Joi.string().alphanum().min(4).max(45),
  questionText: Joi.string().regex(RegexCheck.TEXT).min(6).max(500),
  questions: Joi.array().items(question),
  tag: Joi.array().items(Joi.string().alphanum().min(4).max(25)),
  index: Joi.number().integer().min(1),
  creatorRef: Joi.string().regex(RegexCheck.OBJECTID),
  _id: Joi.string().regex(RegexCheck.OBJECTID)
}

module.exports = QGroups;