var accountControllers = require('../controllers/accountControllers.js');
var relationshipControllers = require('../controllers/relationshipControllers.js');
var passport = require('passport');
var path = require('path');

module.exports = function(app, express) {

  app.get('/api/users/', passport.authenticate('bearer', { session: false}), relationshipControllers.getUserInArea);
  app.get('/api/users/:id', passport.authenticate('bearer', { session: false}), accountControllers.getUserById);
  app.post('/api/users/', passport.authenticate('bearer', { session: false}), accountControllers.createNewUser);
  app.put('/api/users/:id', passport.authenticate('bearer', { session: false}), accountControllers.updateUser);
  app.delete('/api/users/:id', passport.authenticate('bearer', { session: false}), accountControllers.deleteUser);

  app.get('/api/relationship', passport.authenticate('bearer', { session: false}),relationshipControllers.getConnections);
  app.post('/api/relationship', passport.authenticate('bearer', { session: false}),relationshipControllers.createRelationship);
  app.delete('/api/relationship', passport.authenticate('bearer', { session: false}),relationshipControllers.deleteRelationship);

  app.post('/api/login', accountControllers.signIn);

  app.get('/', function(req, res){
    res.send('Go to http://tolodating.herokuapp.com');
  });


};


