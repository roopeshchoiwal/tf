import jwt from 'jsonwebtoken';

const generateToken = function(payload, expiry){
    if((payload.username !== null) && (payload.email !== null)){
      let options = {
        expiresIn: expiry || '1d',
        issuer: process.env.WEBSITE_NAME
      };
      let secret = process.env.JWT_SECRET;
      var jwtToken = jwt.sign(payload, secret, options);
      return jwtToken;
    }
    else throw new Error("System Error","generateTokenJWT function malfunctioned");
  } 

export default generateToken;