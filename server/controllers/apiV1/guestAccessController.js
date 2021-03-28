import siteConfig from '../../config/siteConfig';
import { DateTime } from 'luxon';
import generateTokenJWT from './commons/generateToken';

const GuestAccessController = {};

GuestAccessController.loginPost = function(req, res, next){
    if(typeof req.body.username === 'string'){
        var result = generateTokenJWT({guest: req.body.username});
    } else res.status(200).send({
        success: false, 
        error: "Guest Name should be Type\: String", 
        message: "The Guest Name shuold be String" 
    });
    res.status(200).send({
        success: true,
        token: result
    });
}

GuestAccessController.setExamStatePost = function(req, res, next){
    var presentState = req.decodedJWT;
    if(presentState.state == null){    
        generateTokenJWT({guest: presentState.guest, state: req.body.state});
    } else {
        let newState = {...presentState};
        newState = {...req.body.state};
        var result = generateTokenJWT({guest: presentState.guest, state: {...newState}})
    }
    return result;
}

GuestAccessController.submitPost = function(state){
    if(typeof guest.usename === 'string'){
        var result = generateTokenJWT({guest});
    } else res.status(200).send({
        success: false, 
        error: "Guest Name should be Type\: String", 
        message: "The Guest Name shuold be String" 
    });
    return result;
}



export default GuestAccessController;