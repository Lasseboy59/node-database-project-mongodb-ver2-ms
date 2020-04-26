const express = require('express');
const { check, body } = require('express-validator')

const authController = require('../controllers/auth')
const User = require('../models/user')

const router = express.Router();

router.get('/login', authController.getLogin)

router.get('/signup', authController.getSignup);

router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please pick a valid email'),
    body('password', 'Password has to be valid')
      .isLength({ min: 5 })
  ],
  authController.postLogin)

router.post('/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email!')
      .custom((value, { req }) => {
        // if (value === 'test@com') {
        //   throw new Error('This email address is forbidden')
        // }
        // return true
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'Email already exists, please pick different one'
            )
          }
        })
      }),
    body('password', 'Please enter a password with only numbers and text within at least 5 chars')
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!')
      }
      return true
    })
  ],
  authController.postSignup);

router.post('/logout', authController.postLogout)

router.get('/reset', authController.getReset)

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router
