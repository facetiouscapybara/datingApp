var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token');
    }
  });
  // app.use(express.static(__dirname + '/../../client'));
};