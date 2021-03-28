import Questions from '../../models/questions';
import dbOperation from './commons/dbOperation';

const questionController = {};

questionController.showAllGet = function(req, res, next){
    dbOperation.showAll(Questions, req.decodedJWT).then(function(docs){
        res.status(200).send(docs);
    }).catch(function(err){
        res.status(200).send(docs);
    });
}

questionController.createPost = function(req, res, next){
    dbOperation.create(Questions, req.body, req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}
//create question
questionController.fetchByExamRefPost = function(req, res, next){
    dbOperation.showByKey(Questions, "examRef", req.body.examRef).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}

questionController.addQuestionPost = function(req, res, next){
    
}

//add question to question

questionController.editPost = function(req, res, next){
    dbOperation.edit(Questions, req.body, req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}
//edit question

questionController.deleteGet = function(req, res, next){
    dbOperation.remove(Questions, req.body._id || req.body, req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    })
}

//delete question

export default questionController;