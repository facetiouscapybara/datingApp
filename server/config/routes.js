var accountControllers = require('../controllers/accountControllers.js');
var relationshipControllers = require('../controllers/relationshipControllers.js');
var passport = require('passport');
var path = require('path');

module.exports = function(app, express) {

  app.get('/api/users/', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }), relationshipControllers.getUserInArea);
  app.get('/api/users/:id', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }), accountControllers.getUserById);
  app.post('/api/users/', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }), accountControllers.createNewUser);
  app.put('/api/users/:id', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }), accountControllers.updateUser);
  app.delete('/api/users/:id', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }), accountControllers.deleteUser);

  app.get('/api/relationship', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }),relationshipControllers.getConnections);
  app.post('/api/relationship', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }),relationshipControllers.createRelationship);
  app.delete('/api/relationship', passport.authenticate('bearer', { session: false, failureRedirect: '/login' }),relationshipControllers.deleteRelationship);

  app.post('/api/login', accountControllers.signIn);

  app.get('/login', function(req, res){
    res.send('this is the login page');
  });
};


