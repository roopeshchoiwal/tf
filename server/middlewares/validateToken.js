import jwt from 'jsonwebtoken';

const  validateToken = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1];
      const Bearer = req.headers.authorization.split(' ')[0];
      if((Bearer === 'bearer') ||(Bearer === 'Bearer')) 
      {// Bearer <token>
        const options = {
          expiresIn: '1d',
          issuer: process.env.WEBSITE_NAME
        };
        try {
          // verify makes sure that the token hasn't expired and has been issued by us
          result = jwt.verify(token, process.env.JWT_SECRET, options);
          // Let's pass back the decoded token to the request object
          if((result.guest == null)){
            req.decodedJWT = result;
          }
          req.decodedGuestJWT = result;
          // We call next to pass execution to the subsequent middleware
          next();
        } catch (err) {
          // Throw an error just in case anything goes wrong with verification
          next({
            success: false,
            message: "Token Validation Failed",
            error: err
          });
        }
      } else {
        result = { 
          error: `Authentication error. Token required`,
          status: 401,
          message: "Validation facing issue, not error but req not set"
        };
        res.status(401).send(result);
      }
    } else next({ status: 500, success: false, error: "validation Error", message: "Bearer token not found in request"});
  };

  export default validateToken;