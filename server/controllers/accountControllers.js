var db = require('../db/database.js');


// The user info for the addUser function needs to come in this format

//	{
//		name: 'Eric',
//		age: 26,
//		preference: 'women',
//		bio: 'A developer at Hack Reactor',
//		sex: 'man'
//	}

module.exports.createNewUser = function (req, res) {

	var userInfo = req.body.userInfo;
  var queryString = 'CREATE (user:Person {name : {name}, age:{age}, preference:{preference}, bio:{bio}, sex:{sex}}) RETURN user';
  db.cypherQuery(queryString, userInfo, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(200).json(response);
  	}
  });
};

module.exports.updateUser = function (req, res) {
	var userInfo = req.body.userInfo;
	var fields = Object.keys(userInfo);
	var stringEnding = ',';
	var queryString = fields.reduce(function(memo, field, index){
		if(index === fields.length-1){
			stringEnding = ' RETURN user';
		}
		memo = memo.concat(' user.' + field + ' = "' + userInfo[field] + '"' + stringEnding);
		return memo;
	}, 'START user=node({userId})');

	db.cypherQuery(queryString, params, function (err, response) {
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).json(response);
		}
	});
};

module.exports.getUsersById = function(req, res) {
var queryString = 'START user=node({userId}) RETURN user';
var params = {userId: req.body.idArray};
  db.cypherQuery(queryString, params, function (err, response) {
      if (err) {
      	res.status(404).json(err);
      } else {
        res.status(200).json(response.results[0].data);
      }
    }
  );
};

module.exports.deleteUser = function(req, res) {
	var params = {userId : req.body.userId};
	var queryString = 'START user=node({userId}) DETACH DELETE user';
	
	db.cypherQuery(queryString, params, function (err, response) {
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).json(response);
		}
	});
};