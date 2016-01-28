var accountControllers = require('../controllers/accountControllers.js');
var relationshipControllers = require('../controllers/relationshipControllers.js');
var passport = require('passport');

module.exports = function(app, express) {
	app.post('/api/account', passport.authenticate('bearer', { failureRedirect: '/login'}), accountControllers.createNewUser);
	app.post('/api/getUser/', passport.authenticate('bearer', { failureRedirect: '/login'}), accountControllers.getUserById);
	app.put('/api/account', passport.authenticate('bearer', {failureRedirect: '/login'}),accountControllers.updateUser);
	app.delete('/api/account', passport.authenticate('bearer', {failureRedirect: '/login'}),accountControllers.deleteUser);

	app.post('/api/relationship', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.createRelationship);
	app.delete('/api/relationship', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.deleteRelationship);

	app.post('/api/getUsers', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.getEligibleUsersInArea);
	app.post('/api/connections', passport.authenticate('bearer', {failureRedirect: '/login'}),relationshipControllers.getConnections);

	app.get('/api/loggedin', passport.authenticate('bearer', {failureRedirect: '/login'}),function(req,res) {
	   res.send(req.isAuthenticated() ? req.user : '0');
	 });

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
	
	app.get('/', passport.authenticate('bearer', {failureRedirect: '/login', session: false}), function(req, res){
		res.send('this is the home page');
	});

};



