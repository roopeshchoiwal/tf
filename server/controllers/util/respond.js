import {DateTime} from 'luxon';

//error = {errorCode, errorData}
export default function(status, success, response, errorCode){
    let result = {};
    result.status = status;
    result.success = success;
    result.timeStamp = DateTime.utc();
    if(errorCode){
        result.response = errorHandler(error);
    } else result.response = response;
    
    return result.status(status).send(result);

}