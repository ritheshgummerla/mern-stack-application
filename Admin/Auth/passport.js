const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
//onst AuthUser = mongoose.model('users');
const opts = {};
const AuthUser = require("../models/user");

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

// module.exports = passport => {
//     passport.use(
//         new LocalStrategy({usernameField:'email'},(email,password,done)=>{
//             //match user
//             AuthUser.findOne({email:email})
//             .then(user=>{
//                 if(!user){
//                     return done(null, false, {message:"email is not registered"})
//                 }
//                 //match passowrd
//                 bcrypt.compare(password,user.password,(err,isMatch)=>{
//                     if(err) throw err;

//                     if(isMatch){
//                         return done(null,user)
//                     }else{
//                         return done(null,false, {message:'Password incorrect'})
//                     }
//                 })

//             }).catch(err=>console.log(err))
//         })
//     )

//     passport.serializeUser((user,done)=>{
//             done(null, user.id);
        
//     })

//     passport.deserializeUser((id,done)=>{
//         AuthUser.findById(id, (err, user)=>{
//             done(err, user);
//         })
//     })
   
// }

module.exports = passport=>{
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        AuthUser.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
}