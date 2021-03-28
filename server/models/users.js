import bcrypt from 'bcrypt';
import crypto from 'crypto';
import mongoose from 'mongoose';
import RegexCheck from './utils/regexCheck';
import {Joi} from 'celebrate';
/*
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
*/
var userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: RegexCheck.EMAIL,
      unique: true
      },
    username: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 12,
      minlength: 5,
      unique: true
      },
    mobile: String,
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerified: Boolean,
    google: String,
}, {
  timestamps: true
});
/**
 * Password hash middleware.
 */

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

userSchema.statics.comparePwd = function(candidatePassword, Pwd, cb){
  bcrypt.compare(candidatePassword, Pwd, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const Users = mongoose.model('User', userSchema);

Users.validationKeys = {
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }),
  username: Joi.string().alphanum().min(3).max(30),
  mobile: Joi.number().integer().min(10).max(25),
  password: Joi.string().min(8).max(30),
  passwordResetToken: Joi.string().alphanum().min(40).max(60),
  passwordResetExpires: Joi.date(),
  emailVerificationToken: Joi.string().alphanum().min(40).max(60),
  emailVerified: Joi.boolean(),
  google: Joi.string(),
  _id: Joi.string().regex(RegexCheck.OBJECTID)
}



module.exports = Users;