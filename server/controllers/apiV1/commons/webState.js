import WebState from '../../../models/web-state';

const webstate = function(decodedJWT){
    let result = new Promise(function(resolve, reject){
        WebState.findOne({username: decodedJWT.username, accessKey: decodedJWT.accessKey}, function(err, doc){
            var ws = doc;
            if(err) {
                reject({
                    success: false,
                    error: err
                });
            } if(doc !== null) {
                resolve(doc);
            } else reject({
                success: false,
                error: new Error('No Session for the user', 'system error')
            });
        }); 
    });
    return result;
}

export default webstate;