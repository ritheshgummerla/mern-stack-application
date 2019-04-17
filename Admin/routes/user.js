const express = require("express");
//const router = express.Router();
const appRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");
const AuthUser = require("../models/user");
const withAuth = require("../Auth/jwtauth")
const {ensureAuthenticated} = require("../Auth/auth")
//const User = require("../models/userModel");
//const XOAuth2 = require("Xoauth2")
let secret = 'secret'

appRoutes.post("/register", (req, res) => {
  const { name, mobile, email, password,userRole } = req.body;
  AuthUser.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const newUser = new AuthUser({
                name: name,
                mobile: mobile,
                userRole: userRole,
                email: email,
                password: password
                //avatar
              });
              bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error("There was an error", err);
                else {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.error("There was an error", err);
                    else {
                      newUser.password = hash;
                      newUser.save().then(user => {
                        //Use Smtp Protocol to send Email
                        const transporter = nodemailer.createTransport({
                          service: 'gmail',
                          auth: {
                            user: 'ritheshgummerla76@gmail.com',
                            pass: 'Rithi7396794235'
                          }
                        });
        
                        const mailOptions = {
                          from: 'ritheshgummerla76@gmail.com',
                          to: email,
                          subject: 'Sending Email using Node.js',
                          text: 'That was easy!'
                        };
        
                        transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                            console.log(error);
                          } else {
                            console.log('Email sent: ' + info.response);
                          }
                        });
                        return res.status(200).json({
                          email: "Email saved successfully"
                        });
                      });
                    }
                  });
                }
              });
    }
  });
});

appRoutes.post('/login', (req, res,next)=>{
  // console.log(res)
  // passport.authenticate('local', {
  //   successRedirect:"/success",
  //   failureRedirect:"/failure"
  // })(req,res,next)
  const email = req.body.email;
  const password = req.body.password;

  AuthUser.findOne({ email }).then(user => {
    if (!user) {
      const errors = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          mobile:user.mobile,
          email:user.email,
          userRole:user.userRole
        };
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              console.log(user);
              res.json({
                userRole: user.userRole,
                success: true,
                token: token
              });
            }
          }
        );
      } else {
        const errors = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
})


appRoutes.get('/getdata', withAuth, function(req, res) {
  AuthUser.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
// appRoutes.get("/getdata",
//   // passport.authenticate("jwt", { session: false }),
//   // (req, res) => {
//   //   return res.json({
//   //     id: req.user.id,
//   //     name: req.user.name,
//   //     email: req.user.email
//   //   });
//   // }
//   ).get(function(req, res) {
//       //  const decoded = jwt.verify(req.headers['Authorization'],secret)
//       //  console.log(req.params)
//     //   const x = jwt.verify(req.headers['autherization'],secret, function(err, decoded) {
//     //     if (err) throw err; 
//     //     console.log(decoded);
//     // });
//     // console.log(x);
//   AuthUser.find(function(err, todos) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(todos);
//     }
//   });
// });


// appRoutes.get('/success', (req, res,next)=>{
//   console.log(res)
//   res.json({
//     userRole: "admin",
//     success: true,
//     token: `Bearer`
//   });
// })

// appRoutes.get('/failure', (req, res,next)=>{
//   console.log(res)
//   res.json({
//     userRole: "admin",
//     success: false,
//     token: `Bearer`
//   });
// })






















// appRoutes.post("/register", function(req, res) {
//   console.log(req.body);
//   //const { errors, isValid } = validateRegisterInput(req.body);

//   // if(!isValid) {
//   //     return res.status(400).json(errors);
//   // }
//   AuthUser.findOne({
//     email: req.body.email
//   }).then(user => {
//     if (user) {
//       return res.status(400).json({
//         email: "Email already exists"
//       });
//     } else {
//       console.log("add");
//       // const avatar = gravatar.url(req.body.email, {
//       //     s: '200',
//       //     r: 'pg',
//       //     d: 'mm'
//       // });
//       const newUser = new AuthUser({
//         name: req.body.name,
//         mobile: req.body.mobile,
//         userRole: req.body.userRole,
//         email: req.body.email,
//         password: req.body.password
//         //avatar
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         if (err) console.error("There was an error", err);
//         else {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) console.error("There was an error", err);
//             else {
//               newUser.password = hash;
//               newUser.save().then(user => {
//                 // Use Smtp Protocol to send Email
//                 const transporter = nodemailer.createTransport({
//                   service: 'gmail',
//                   auth: {
//                     user: 'ritheshgummerla76@gmail.com',
//                     pass: 'Rithi7396794235'
//                   }
//                 });

//                 const mailOptions = {
//                   from: 'ritheshgummerla76@gmail.com',
//                   to: 'ritheshgummerla76@gmail.com',
//                   subject: 'Sending Email using Node.js',
//                   text: 'That was easy!'
//                 };

//                 transporter.sendMail(mailOptions, function(error, info){
//                   if (error) {
//                     console.log(error);
//                   } else {
//                     console.log('Email sent: ' + info.response);
//                   }
//                 });
//                 return res.status(200).json({
//                   email: "Email saved successfully"
//                 });
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// });

// appRoutes.post("/login", (req, res) => {
//   // const { errors, isValid } = validateLoginInput(req.body);

//   // if(!isValid) {
//   //     return res.status(400).json(errors);
//   // }

//   const email = req.body.email;
//   const password = req.body.password;

//   AuthUser.findOne({ email }).then(user => {
//     if (!user) {
//       const errors = "User not found";
//       return res.status(404).json(errors);
//     }
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         const payload = {
//           id: user.id,
//           name: user.name,
//           avatar: user.avatar
//         };
//         jwt.sign(
//           payload,
//           "secret",
//           {
//             expiresIn: 3600
//           },
//           (err, token) => {
//             if (err) console.error("There is some error in token", err);
//             else {
//               console.log(user);
//               res.json({
//                 userRole: user.userRole,
//                 success: true,
//                 token: `Bearer ${token}`
//               });
//             }
//           }
//         );
//       } else {
//         const errors = "Incorrect Password";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// appRoutes.get(
//   "/me",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     return res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

// appRoutes.route("/addtodo").post(function(req, res) {
//   console.log(req.body);
//   let user = new User(req.body);
//   user
//     .save()
//     .then(todo => {
//       res.status(200).json({ todo: "todo added successfully" });
//       res.send(todo);
//     })
//     .catch(err => {
//       res.status(400).send("adding new todo failed");
//     });
// });


// appRoutes.route("/update").put(function(req, res) {
//   console.log(req.body);
//   User.findOneAndUpdate(
//     { _id: req.body._id },
//     { $set: req.body },
//     { upsert: true },
//     function(err, doc) {
//       if (err) {
//         throw err;
//       } else {
//         res.json(doc);
//       }
//     }
//   );
// });

// appRoutes.route("/delete/:id").get(function(req, res) {
//   console.log(req.params.id);
//   User.findByIdAndRemove({ _id: req.params.id }, function(err, todos) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(todos);
//       res.json(todos);
//     }
//   });
// });

module.exports = appRoutes;
