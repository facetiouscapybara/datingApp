var accountControllers = require('../controllers/accountControllers.js');
var relationshipControllers = require('../controllers/relationshipControllers.js');
var passport = require('passport');

module.exports = function(app, express) {

	app.get('/api/users/:id', passport.authenticate('bearer', { session: false, failureRedirect: '/login'}), accountControllers.getUserById);
	app.put('/api/users/:id', passport.authenticate('bearer', {failureRedirect: '/login'}),accountControllers.updateUser);
	app.delete('/api/users/:id', passport.authenticate('bearer', {failureRedirect: '/login'}),accountControllers.deleteUser);

	app.post('/api/relationship', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.createRelationship);
	app.delete('/api/relationship', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.deleteRelationship);

	app.post('/api/getUsers', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.getEligibleUsersInArea);
	app.post('/api/connections', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.getConnections);

	app.post('/api/login', accountControllers.signIn);

	 app.get('/api/auth/facebook',
	   passport.authenticate('facebook', { scope: ['public_profile'] }), function(req, res){});

	 app.get('/api/auth/facebook/callback',
	   passport.authenticate('facebook',  { session: false, failureRedirect: '/login'}),
	   function(req, res) {
	     res.redirect('/');
	   });

	app.get('/login', function(req, res){
		res.send('this is the login page');
	});
	
	app.get('/', passport.authenticate('bearer', { session: false, failureRedirect: '/login'}), function(req, res){
		res.send('this is the home page');
	});

};



