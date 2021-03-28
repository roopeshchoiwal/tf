import webstate from './webState';
import {isEmpty} from 'lodash';
const dbOperation = {};

dbOperation.create = function(model, document, context){
    let result = new Promise(function(resolve, reject){
        let webState = webstate(context);
        webState.then(function(ws){
            let user = ws;
            let newDoc = { ...document, creatorRef: user.userRef };
            let modelInstance = new model(newDoc);
            modelInstance.save(function(err, doc){
                if(err) {
                    reject({
                        success: false,
                        error: err
                    });
                }else {
                    resolve({
                        success: true,
                        error: null,
                        _id: doc._id
                    });
                }
            });    
            }).catch(function(err){
                reject({
                    success: false,
                    error: err
                });
            });
    });
    return result;
}

dbOperation.remove = function(model, id, context){
    if(typeof id == 'object'){
        id = id._id;
    }
    const result = new Promise(function(resolve, reject){
        let webState = webstate(context);
        webState.then(function(ws){
            let user = ws;
            model.find({_id: id, creatorRef: user.userRef }).remove(function(err, doc){
                if(err) reject(err);
                if(doc == null) reject(new Error('no such document exists', 'system error'));
                else resolve(doc);
            });
        });
    });
    return result;
}

dbOperation.removeSync = function(parentModel, childModel, id, childRef, context){
    const result = new Promise(function(resolve, reject){
        let webState = webstate(context);
        webState.then(function(ws){
            let user = ws;
            parentModel.findOne({_id: id , creatorRef: user.userRef }, function(err, oldDoc){
                if(err) reject(err);
                if((oldDoc == null) || isEmpty(oldDoc)) reject(new Error('no such document exists', 'system error'));
                if(typeof oldDoc[childRef] == 'undefined' && oldDoc[childRef] < 1){
                    dbOperation.remove(parentModel, id, context).then(function(res){ 
                        resolve({ success: true, response: res});
                    }).catch(function(err){ reject(err); }); 
                }
                else {
                    var resultArray = [];
                    oldDoc[childRef].forEach((val)=>{
                        childModel.find({ _id: val._id, creatorRef: user.userRef}).remove(function(err, doc){
                            if(err) resultArray.push(err);
                            if(doc) resultArray.push(doc);
                        });
                    });
                    resolve({
                        success: true,
                        response: resultArray
                    });
                }
            });
        });
    });
    return result;
}

dbOperation.showAll = function(model, context){
    const result = new Promise(function(resolve, reject){
        let webState = webstate(context);
        webState.then(function(ws){
            let user = ws;
            model.find({creatorRef: user.userRef}, function(err, docsArray){
                if(err) reject(err);
                if(typeof docsArray == 'undefined' && docsArray.length < 1){ 
                    reject(new Error('No Data to Show', 'No Such data available'));
                }
                else resolve({
                    success: true,
                    response: docsArray
                });
            });
        });
    });
    return result;
}

dbOperation.showOne = function(model, id){
    const result = new Promise(function(resolve, reject){
        model.findById(id, function(err, doc){
            if(err) reject(err);
            if(doc == null){ 
                reject(new Error('No Data to Show', 'No Such data available'));
            }
            else resolve({
                success: true,
                response: doc
            });
        });
    });
    return result;
}

dbOperation.showByKey = function(model, key, value){
    const result = new Promise(function(resolve, reject){
        model.find({[key]: value}, function(err, doc){
            if(err) reject(err);
            if(doc == null){ 
                reject(new Error('No Data to Show', 'No Such data available'));
            }
            else resolve({
                success: true,
                response: doc
            });
        });
    });
    return result;
}

dbOperation.edit = function(model, document, context){
    let result = new Promise(function(resolve, reject){
        let webState = webstate(context);
        webState.then(function(ws){
            let user = ws;
            model.findOne({_id: document._id, creatorRef: user.userRef}, function(err, oldDoc){
                if(err) reject(err);
                if((oldDoc == null)|| isEmpty(oldDoc)) reject(new Error('No such document found', 'system error'));
                else {
                    let newDoc = {...oldDoc};
                    newDoc = {...document, creatorRef: ws.userRef};
                    let modelInstance = model(newDoc);
                    modelInstance.isNew = false;
                    modelInstance.save(function(err, doc){
                        if(err) reject(err);
                        if(doc == null) reject(new Error('document create failure', 'system error'));
                        else resolve(doc);
                    })
                }
            })
        });
    });
    return result;
}

dbOperation.pushElement = function(model, document, key, context){
    let result = new Promise(function(resolve, reject){
        let webState = webstate(context);
        webState.then(function(ws){
            let user = ws;
            model.findById(document._id, function(err, oldDoc){
                if(err) reject(err);
                if(doc == null) reject(new Error('No such Documment found', 'system Error'));
                else {
                    let newDoc = oldDoc;
                    newDoc[key].push(document[key]);
                    model.update({_id: document._id, creatorRef: user.userRef}, {$set:{...newDoc}}, function(err, doc){
                        if(err) {reject(err);}
                        if(doc == null) reject(new Error('system error', 'No such document'));
                        else{
                            resolve(doc);
                        }
                    });
                }
            });
        });
    });
    return result;
}

dbOperation.searchPublic = function(model, key, strng){
    const result = new Promise(function(resolve, reject){
        model.find({ [key]: { $regex: strng, $options: "i" } }, function(err, docsArray) {
            if(err) reject(err);
            if(typeof docsArray == 'undefined' || docsArray.length < 1){ 
                reject(new Error('No Data to Show', 'No Such data available'));
            }
            else resolve({
                success: true,
                response: docsArray
            });
        });
    });
    return result;
}


dbOperation.searchPrivate = function(model, key, strng){
    const result = new Promise(function(resolve, reject){
        let webState = webstate(req.decodedJWT);
        webState.then(function(ws){
            let user = ws;
            model.find({ userRef: user.userRef, [key]: { $regex: strng, $options: "i" } }, function(err, docsArray) {
                if(err) reject(err);
                if(typeof docsArray == 'undefined' && docsArray.length < 1){ 
                    reject(new Error('No Data to Show', 'No Such data available'));
                }
                else resolve({
                    success: true,
                    response: docsArray
                });
            });
        });
    });
    return result;
}


export default dbOperation;