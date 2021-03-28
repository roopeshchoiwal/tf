import QGroups from '../../models/qgroups';
import dbOperation from './commons/dbOperation';
import Questions from '../../models/questions';

const qGroupController = {};

qGroupController.showAllGet = function(req, res, next){
    dbOperation.showAll(QGroups, req.decodedJWT).then(function(docs){
        res.status(200).send(docs);
    }).catch(function(err){
        res.status(200).send(docs);
    });
}

qGroupController.createPost = function(req, res, next){
    dbOperation.create(QGroups, req.body, req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}
//create qGroup


qGroupController.addQuestionPost = function(req, res, next){
    dbOperation.pushElement(QGroups, req.body, 'questions', req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}

//add question to qGroup

qGroupController.editPost = function(req, res, next){
    dbOperation.edit(QGroups, req.body, req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}
//edit qGroup

qGroupController.deletePost = function(req, res, next){
    dbOperation.removeSync(QGroups, Questions, req, questions).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });   
}

qGroupController.fetchByExamRefGet = function(req, res, next){
    dbOperation.searchPrivate(QGroups, "examRef", req.params.id).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}
//delete qGroup

export default qGroupController;