const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');


// Importing MongoDb model
// Importing mongoose 
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Importing local userSchema
const User = require('./models/usermodels');

express().set('view engine', 'ejs');

// login getRoute function 
const loginGetRoute = (req, res, next) => {

  res.status(200).render('login');
}

router.route('/').get(loginGetRoute);

// router.route('/').post( async (req,res,next)=>{
//     console.log(req.body);
//     const userEmail = req.body.email;
//     const password = req.body.password;
//     console.log(userEmail);
//     // res.status(200).json({message: userEmail});
//     const user = await User.findOne({email: userEmail});
//     if(!user){
//        return  res.status(200).send('The email is not registreed');
//     }
//     const match = await bcrypt.compare(password, user.password);

//     if(match) {
//         return res.status(200).send('login successful');
//     }
//     res.status(200).send('password does not match');

// })

const customFields = { usernameField: "email", passwordField: "password" };

const varify = async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: 'User Name or Password is Incorrect' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'User Name or Password is Incorrect' });
    }
    done(null, user)

  }
  catch (err) {
    return done(err);
  }

};







passport.use(new LocalStrategy(customFields, varify));

//  function(email, password, done) {
//     console.log(email);
//   User.findOne({ email: email }, async function (err, user) {
//     console.log(user);
//     if (err) { return done(err); }
//     if (!user) { return done(null, false); }
//     const match = await bcrypt.compare(password,user.password);
//     if (!match){
//         console.log('does not match')
//         return done(null,false,{message: 'user/password does not match'})
//     }

//     //if (!user.verifyPassword(password)) { return done(null, false); }
//     return done(null, user);
//   });
// }


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});




module.exports = router


