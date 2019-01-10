//'use strict';

const express = require('express');
const router = express.Router();
const passportParse = require('../models/Auth.js');
const baseAuth = require('./base/authentication.js');

// route middleware that will happen on every request
router.use(function (req, res, next) {
  // continue doing what we were doing and go to the route
  next();
});

router.post('/signup', function (req, res) {
  console.log(req);
  if (!req.body.username || !req.body.password) {
    res.status(400).send('missing params');
    return;
  }

  let user = new Parse.User();
  user.set('soDienThoai', req.body.phone);
  user.set('email', req.body.email);
  user.set('emailUser', req.body.email);
  
  user.set('role', 'KHACH');
  user.set('username', req.body.username);
  user.set('password', req.body.password);

  user.save(null, {useMasterKey: true}).then((user) => {
    req.logIn(user, (err) => {
      if (err) {
        return res.status(400).json({ payload: { error: err }, message: info.message });
      }

      return res.send('welcome');
    });
  }).catch((err) => {
    return res.status(400).json(err);
  });
});

/* GET Login page. */
router.get('/login', baseAuth.ensureUnauthenticated, function (req, res) {
  res.render('auth/login', {
  });
});

router.post('/login',
  baseAuth.ensureUnauthenticated,
  function (req, res, next) {
    passportParse.authenticate('parse', function (error, user, info) {
      console.log(req.user);
      console.log(error);
      console.log(info);
      if (error) {
        res.status(401).send(error.message);
      } else if (!user) {
        res.status(401).send(info.message);
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return res.status(400).json({ payload: { error: err }, message: info.message });
          }

          return res.send('welcome');
        });
      }
    })(req, res, next);
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy();

  if (req.query.access == 0) {
    res.redirect('/auth/login');
  }

  res.redirect('back');
});

module.exports = router;