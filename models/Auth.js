'use strict';

const UTILS = require('../helpers/UTILS');

var passport = require('passport');
const ParseStrategy = require('../config/passport-parse');

let parseSDK = require('../config/parseSDK').init();
let parseStrategy = new ParseStrategy({ parseClient: parseSDK });

passport.use('parse', parseStrategy);

passport.serializeUser(function(user, done) {

  console.log('serializeUser')
  console.log(user);
  done(null, user);
});

passport.deserializeUser(async function(obj, done) {
  let user = await UTILS.fetchObject('User', 'objectId', obj.objectId);

  done(null, user || obj);
});

module.exports = passport;