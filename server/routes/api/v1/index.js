import express from 'express';
import TokenGenerator from 'uuid-token-generator';
import allController from '../../../controllers/apiV1';
import validateToken from '../../../middlewares/validateToken';
import {celebrate, Joi, errors, Segments } from 'celebrate';
import {
    Users, Questions, WebState, QGroups, Exams
  } from '../../../models';

const token2 = new TokenGenerator(256, TokenGenerator.BASE62);
var router = express.Router();

//user managment

router.post('/register', (req, res, next) => allController.userController.registerPost(req, res, next));

router.post('/login', (req, res, next) => allController.userController.loginPost(req, res,  next));

router.get('/logout', validateToken, (req, res, next) => allController.userController.logoutGet(req, res,  next));

router.get('/exam/search', (req,res,next) => {
  allController.examController.searchGet(req, res, next);
});

router.post('/exam/fetch', (req,res,next) => {
  allController.examController.showOnePost(req, res, next);
});

router.get('/exam/:id', (req,res,next) => {
  allController.examController.showOneGet(req, res, next);
});

router.get('/token/check', validateToken, (req,res,next) => {
  res.status(200).send({
    success: true,
    username: req.decodedJWT.username
  });
});

router.get('/exams', validateToken, (req,res,next) => {
  allController.examController.showAllGet(req,res,next);
});

router.get('/questions', validateToken, (req,res,next) => {
  allController.questionsController.showAllGet(req,res,next);
});

router.get('/qgroups', validateToken, (req,res,next) => {
  allController.qGroupsController.showAllGet(req,res,next);
});
router.get('/webstates', validateToken, (req,res,next) => {
  allController.webStatesController.showAllGet(req,res,next);
});
router.get('/users', validateToken, (req,res,next) => {
  allController.userController.showAllGet(req,res,next);
});

//add document to collection
router.post('/guest/login', celebrate({
  [Segments.BODY]: Joi.object().keys(Users.validationKeys),
}), (req,res,next) => {
    allController.guestAccessController.loginPost(req, res, next);
  });

router.post('/exam/add', validateToken, celebrate({
    [Segments.BODY]: Joi.object().keys(Exams.validationKeys),
  }), (req,res,next) => {
      allController.examController.createPost(req, res, next);
    });

router.post('/question/add', validateToken, celebrate({
    [Segments.BODY]: Joi.object().keys(Questions.validationKeys),
  }), (req,res,next) => {
      allController.questionController.createPost(req, res, next);
  });

router.post('/exam/questions', validateToken, celebrate({
    [Segments.BODY]: Joi.object().keys(Questions.validationKeys),
  }), (req,res,next) => {
      allController.questionController.fetchByExamRefPost(req, res, next);
  });

router.post('/questionGroup/add', validateToken, celebrate({
  [Segments.BODY]: Joi.object().keys(QGroups.validationKeys),
}), (req,res,next) => {
  allController.qGroupController.createPost(req, res, next);
});

router.post('/exam/questionGroups', validateToken, celebrate({
  [Segments.BODY]: Joi.object().keys(Questions.validationKeys),
}), (req,res,next) => {
    allController.qGroupController.fetchByExamRefPost(req, res, next);
});
// Add questions to a QGroup or Exam

router.post('/exam/addQuestion', validateToken, celebrate({
  [Segments.BODY]: Joi.object().keys(Questions.validationKeys),
}), (req,res,next) => {
  allController.examController.addQuestionPost(req, res, next);
});


router.post('/questionGroup/addQuestion', validateToken, celebrate({
  [Segments.BODY]: Joi.object().keys(Questions.validationKeys),
}), (req,res,next) => {
  allController.qGroupController.addQuestionPost(req, res, next);
});

//edit document

router.post('/exam/edit', validateToken, celebrate({
  [Segments.BODY]: Joi.object().keys(Exams.validationKeys),
}), (req,res,next) => {
  allController.examController.editPost(req, res, next);
});

router.post('/question/edit', validateToken, celebrate({
  [Segments.BODY]: Joi.object().keys(Questions.validationKeys),
}), (req,res,next) => {
  allController.questionController.editPost(req, res, next);
});

router.post('/questionGroup/edit', validateToken, celebrate({
  [Segments.BODY]: Joi.object().keys(Questions.validationKeys),
}), (req,res,next) => {
  allController.qGroupController.editPost(req, res, next);
});


export default router;