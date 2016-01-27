var accountControllers = require('../controllers/accountControllers.js');
var relationshipControllers = require('../controllers/relationshipControllers.js');
var locaitonControllers = require('../controllers/locationControllers.js');
var passport = require('passport');

module.exports = function(app, express) {
	app.post('/api/user', accountControllers.createNewUser);
	app.post('/api/getUser/', accountControllers.getUserById);
	app.put('/api/user', accountControllers.updateUser);
	app.delete('/api/user', accountControllers.deleteUser);

	app.post('/api/relationship', relationshipControllers.createRelationship);
	app.delete('/api/relationship', relationshipControllers.deleteRelationship);

	app.post('/api/getUsers', locaitonControllers.getUsersInArea);


	app.get('/api/loggedin', function(req, res) {
	   res.send(req.isAuthenticated() ? req.user : '0');
	 });

	 app.get('/api/auth/facebook',
	   passport.authenticate('facebook', { scope: ['public_profile'] }), function(req, res){});

	 app.get('/auth/facebook/callback',
	   passport.authenticate('facebook',  { session: false, failureRedirect: '/login'}),
	   function(req, res) {
	     res.redirect('/');
	   });

	app.get('/login', function(req, res){
		res.send('this is the login page');
	});
	
	app.get('/', function(req, res){
		res.send('this is the home page');
	});

};



