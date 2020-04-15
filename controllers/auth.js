const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5e947d0abdbc696703ede86d')
    .then(user => {
      req.session.isLoggedIn = true
      req.session.user = user
      res.redirect('/')
    })
    .catch(err => console.log(err))
};