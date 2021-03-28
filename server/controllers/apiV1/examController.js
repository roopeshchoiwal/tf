import Exams from '../../models/exams';
import dbOperation from './commons/dbOperation';


const examController = {};

examController.showAllGet = function(req, res, next){
    dbOperation.showAll(Exams, req.decodedJWT).then(function(docs){
        res.status(200).send(docs);
    }).catch(function(err){
        res.send.status(501).send(err);
    });
}

examController.showOneGet = function(req, res, next){
    dbOperation.showOne(Exams, req.params.id).then(function(docs){
        res.status(200).send(docs);
    }).catch(function(err){
        res.send.status(501).send(err);
    });
}

examController.showOnePost = function(req, res, next){
    dbOperation.showByKey(Exams, "examName", req.body.examName).then(function(docs){
        res.status(200).send(docs);
    }).catch(function(err){
        res.send.status(501).send(err);
    });
}

examController.createPost = function(req, res, next){
    dbOperation.create(Exams, req.body, req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}
//create exam


examController.addQuestionPost = function(req, res, next){
    dbOperation.pushElement(Exams, req.body, 'questions', req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}

//add question to exam

examController.editPost = function(req, res, next){
    dbOperation.edit(Exams, req.body, req.decodedJWT)
    .then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}
//edit exam

examController.deleteGet = function(req, res, next){
    dbOperation.remove(Exams, req.body._id || req.body, req.decodedJWT).then(function(doc){
        res.status(200).send(doc);
    }).catch(function(err){
        res.status(501).send(err);
    });
}

examController.searchGet = function(req, res, next){
    dbOperation.searchPublic(Exams, 'examName', req.query['exam']).then(function(docs){
        res.status(200).send(docs);
    }).catch(function(err){
        res.status(501).send(err);
    });
}

//delete exam

export default examController;