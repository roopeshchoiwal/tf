import dbOperation from './dbOperation';

const controller = function(model) {
    let initialController = {};

    initialController.get = {};
    initialController.post ={};

    // get: fetchOne, fetchMany, deleteOne, deleteMany, toggle [setTrue, setFalse]
    // post: create, edit, pushForeignKey, popForeignKey


    //get
    initialController.get.fetchOne = function(req, res, next){
        dbOperation.showOne(model, req.params.id).then(function(docs){
            res.status(200).send(docs);
        }).catch(function(err){
            res.send.status(501).send(err);
        });    
    };
    
    initialController.get.fetchMany = function(req, res, next){
        dbOperation.showAll(model, req.decodedJWT).then(function(docs){
            res.status(200).send(docs);
        }).catch(function(err){
            res.send.status(501).send(err);
        });
    };

    initialController.get.deleteOne = function(req, res, next){
        dbOperation.remove(model, req.body._id || req.body, req.decodedJWT).then(function(doc){
            res.status(200).send(doc);
        }).catch(function(err){
            res.status(501).send(err);
        });
    };

    initialController.get.delteMany = function(req, res, next){

    };

    initialController.get.toggle = function(req, res, next){

    };

    initialController.get.search = function(req,res,next){
        dbOperation.searchPublic(model, Object.keys(req.query)[0], req.query[Object.keys(req.query)[0]]).then(function(docs){
            res.status(200).send(docs);
        }).catch(function(err){
            res.status(501).send(err);
        });
    };
    //post
    initialController.post.create = function(req, res, next){
        dbOperation.create(model, req.body, req.decodedJWT).then(function(doc){
            res.status(200).send(doc);
        }).catch(function(err){
            res.status(501).send(err);
        });
    };

    initialController.post.edit = function(req, res, next){
        dbOperation.edit(model, req.body, req.decodedJWT)
        .then(function(doc){
            res.status(200).send(doc);
        }).catch(function(err){
            res.status(501).send(err);
        });
    };

    initialController.post.pushForeignKey = function(req, res, next){
        dbOperation.pushElement(model, req.body, 'questions', req.decodedJWT).then(function(doc){
            res.status(200).send(doc);
        }).catch(function(err){
            res.status(501).send(err);
        });
    
    };

    initialController.post.popForeignKey = function(){

    };



}

export default controller;


examController.addQuestionPost = function(req, res, next){
    dbOperation.pushElement(Exams, req.body, 'questions', req.decodedJWT).then(function(doc){
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