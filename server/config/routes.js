var accoutControllers = require('../controllers/accountControllers.js');
var relationshipControllers = require('../controllers/relationshipControllers.js');
var locaitonControllers = require('../controllers/locationControllers.js');

module.exports = function(app, express) {

	app.post('/api/user', accoutControllers.createNewUser);
	app.get('/api/user/:id', accoutControllers.getUserById);
	app.put('/api/user/:id', accoutControllers.updateUser);
	app.delete('/api/user/:id', accoutControllers.deleteUser);

	app.post('/api/relationship', relationshipControllers.createRelationship);
	app.delete('/api/relationship', relationshipControllers.deleteRelationship);

	app.post('/api/getUsers', locaitonControllers.getUsersInArea);

	app.get('/', function(req, res){
		res.send('hello there!');
	});

}



