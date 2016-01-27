var accountControllers = require('../controllers/accountControllers.js');
var relationshipControllers = require('../controllers/relationshipControllers.js');
var locaitonControllers = require('../controllers/locationControllers.js');
var authenticateControllers = require('../controllers/authenticateControllers.js');
var passport = require('passport');

module.exports = function(app, express) {
	app.post('/api/user', accountControllers.createNewUser);
	app.get('/api/user/:id', accountControllers.getUserById);
	app.put('/api/user/:id', accountControllers.updateUser);
	app.delete('/api/user/:id', accountControllers.deleteUser);

	app.post('/api/relationship', relationshipControllers.createRelationship);
	app.delete('/api/relationship', relationshipControllers.deleteRelationship);

	app.post('/api/getUsers', locaitonControllers.getUsersInArea);


	app.get('/api/loggedin', function(req, res) {
	   res.send(req.isAuthenticated() ? req.user : '0');
	 });

	 app.get('/api/auth/facebook',
	   passport.authenticate('facebook', { scope: ['public_profile'] }),
	   function(req, res){});

	 app.get('/api/auth/facebook/callback',
	   passport.authenticate('facebook', { failureRedirect: '/#/login' }),
	   function(req, res) {
	     res.redirect('/#/');
	   });

	 app.get('/api/logout', function(req, res){
	   req.logout();
	   res.redirect('/#/login');
	 });
	
	app.get('/', function(req, res){
		res.send('hello there!');
	});

};



