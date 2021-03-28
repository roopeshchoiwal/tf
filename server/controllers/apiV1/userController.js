import Users from '../../models/users';
import siteConfig from '../../config/siteConfig';
import { DateTime } from 'luxon';
import WebState from '../../models/web-state';
import generateTokenJWT from './commons/generateToken';
import TokenGenerator from 'uuid-token-generator';
import dbOperation from './commons/dbOperation';
import respond from '../util/respond';

const token2 = new TokenGenerator(256, TokenGenerator.BASE62);
const UserController = {};

UserController.registerPost = function(req, res, next){
    if(siteConfig.registerEnabled){
        let user = new Users(req.body);
        user.save(function(err, doc){
        if(err) {res.status(501).send({
          success: false,
          error: err
        });
        }
        else {
          res.status(501).send({
            success: true,
            id: doc._id,
            username: doc.username
          });
        } 
      });
    } else {
        res.send({
          success: false,
          reason: 'function disabled'
        });
    }
}

UserController.loginPost = function(req, res, next) {
  var userAgent = req.headers['user-agent'];
  Users.findOne({username: req.body.username}, function(err, doc){
    var user = doc;
    if( (err == null) && (doc == null)){
      res.status(401).send({
        success: false,
        error: "No Such User",
        message: "Please Enter Correct Username."
      });
    } 
    if((err == null) && (doc !== null)) {
      Users.comparePwd(req.body.password, user.password, function(err, isMatch){
        if((isMatch !== null) && (isMatch)) {
          WebState.findOne({$or:[{userRef: user._id}, {username: user.username}]}, function(err, currentWebstate){
            if(err) {
              res.status(501).send({
                success: false,
                error: "System Error"
              });
            } 
            if(currentWebstate == null){
              var newAccessKey = token2.generate();
              let newWebstate = new WebState({
                userRef: user._id,
                useremail: user.email,
                username: user.username,
                isLoggedIn: true,
                accessKey: newAccessKey,
                timeout: DateTime.local().plus({ hours : 1})
              }); 
              let payload = {
                username: user.username,
                email: user.email,
                accessKey: newAccessKey,
                userAgent: userAgent
              };
              let jwtToken = generateTokenJWT(payload);
          
              newWebstate.save(function(err, doc){
                if(err) {
                  res.status(500).send({
                    success: false,
                    error: err,
                    reason: "session creation failed"
                  });
                }
                else {
                  res.status(200).send({
                    success: true,
                    token: jwtToken,
                    response: doc._id
                  });
                }
              });
            }
            if(currentWebstate !== null){
              let payload = {
                username: currentWebstate.username,
                email: currentWebstate.email,
                accessKey: currentWebstate.accessKey,
                userAgent
              };
              let jwtToken = generateTokenJWT(payload);
              res.status(200).send({
                success: true,
                token: jwtToken
              });
            }
          });
        } else {
          res.status(401).send({
            success: false,
            error: err,
            message: "incorrect password"
          });
        }
      });
    }
    else {
        res.status(500).send({
          success: false,
          error: err,
          message: "invalid username"
        });
      }
  });
}

UserController.logoutGet = function(req, res, next) {
  WebState.find({ username: req.decodedJWT.username }).remove(function(err, done){
    if(err){
      res.status(500).send({
        success: false,
        error: err
      });
    } else {
      req.decodeJWT = null;
      res.status(200).send({
        success: true,
        logout: done
      })
    }
  });
}

UserController.showAllGet = function(req, res, next) {
  dbOperation.showAll(Users, req.decodedJWT).then(function(err, docsArray){
    if((docsArray !== null) || (docsArray.length < 1))
    res.status(200).send({success: true, response: docsArray});
  }).catch(function(err){
    res.status(401).send({success: false, error: err});
  });
}

export default UserController;