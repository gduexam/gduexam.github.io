const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login2', forwardAuthenticated, (req, res) => res.render('login2'));

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
//router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Register
// router.post('/register', (req, res) => {
//   const { full_name, student_code, password, password2 } = req.body;
//   let errors = [];
//   console.log(full_name + student_code + password+ password2)
//   if (!full_name || !student_code || !password || !password2) {
//     errors.push({ msg: 'Please enter all fields' });
//   }

//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

//   if (errors.length > 0) {
//     res.render('register', {
//       errors,
//       full_name,
//       student_code,
//       password,
//       password2
//     });
//   } else {
//     User.findOne({ student_code: student_code }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         res.render('register', {
//           errors,
//           full_name,
//           student_code,
//           password,
//           password2
//         });
//       } else {
//         const newUser = new User({
//           full_name,
//           student_code,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 res.redirect('/users/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// });

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/exam/manage_exam',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.post('/login2', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/exam/manage_exam2',
    failureRedirect: '/users/login2',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;
