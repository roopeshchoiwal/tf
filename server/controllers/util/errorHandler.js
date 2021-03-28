import internationalize from './internationalize';

export default function(errorCode){
    return error[errorCode];

}

const error = {
    //user Error
    'E1000001A': {errorCode: 'E1000001A', error: error, message: internationalize("en","userErrorMessages","userNameNonExist" )},
    'E1000001B': {errorCode: 'E1000001B', error: error, message: internationalize("en","userErrorMessages","wrongPassword" )},
    //serverError
    'E2000001A': {errorCode: 'E1000001A', error: error, message: internationalize("en","userErrorMessages","userNameNonExist" )},
}