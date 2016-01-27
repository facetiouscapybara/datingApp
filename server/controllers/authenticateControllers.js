




var db = require('../db/database.js');

module.exports.authenticateUser = function(app, req, res) {
	var queryString = 'START user=node({userId}) RETURN user';
	var params = {
		userId: req.body.id
	};
	db.cypherQuery(queryString, params, function(err, response) {
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(200).json(response)
		}
	});
};