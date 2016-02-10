var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var passportInit = require('./passport.js');
var session = require('express-session');



module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '../../../node_modules/jquery'));
  app.use(express.static(__dirname + '../../../node_modules/bootstrap'));
  app.use(express.static(__dirname + '../../../docs/'));
  app.use(passport.initialize());
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token');
    }
  });
};