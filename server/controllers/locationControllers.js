var db = require('../db/database.js');

module.exports.getUsersInArea = function (req, res) {
	var params = req.body;
	var queryString = 'MATCH (user:Person {facebookId : {facebookId} }), (target:Person) WHERE target.facebookId IN {idArray} AND NOT user-[:blocked]-target AND NOT user-[:selected]-target return target';
	db.cypherQuery(queryString, params, function (err, response) {
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).json(response);
		}
	});
};

module.exports.filterUsersInArea = function (req, res) {

};