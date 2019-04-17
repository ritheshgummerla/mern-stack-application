const config = require('../db/db');
const jwt =require('jsonwebtoken');

function checkToken(req,res,next){
    console.log("auth")
    const token =req.get('Authorization');
    //console.log(req.get('Authorization'));
    if(!token) res.status(401).json({msg:'no token'})

    // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.jwtSecret, function(err, decoded) {       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;         next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }

}
 module.exports = checkToken;

//  const jwt = require('jsonwebtoken');
// const secret = 'mysecretsshhh';
// const withAuth = function(req, res, next) {
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.headers['x-access-token'] ||
//     req.cookies.token;
//   if (!token) {
//     res.status(401).send('Unauthorized: No token provided');
//   } else {
//     jwt.verify(token, secret, function(err, decoded) {
//       if (err) {
//         res.status(401).send('Unauthorized: Invalid token');
//       } else {
//         req.email = decoded.email;
//         next();
//       }
//     });
//   }
// }
// module.exports = withAuth;
