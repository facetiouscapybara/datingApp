var db = require('../db/database.js');

module.exports.getUsersInArea = function (req, res) {
	var params = { 
		userId : req.body.userId,
		idArray : req.body.idArray 
	};
	var queryString = 'START user=node({userId}) MATCH (target:Person) WHERE id(target) IN {idArray} AND NOT user-[:blocked]-target AND NOT user-[:selected]-target return target';
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