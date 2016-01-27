var db = require('../db/database.js');


// The user info for the addUser function needs to come in this format

//	{
//		name: 'Eric',
//		age: 26,
//		preference: 'women',
//		bio: 'A developer at Hack Reactor',
//		sex: 'man',
//		password: 'password'
//	}

module.exports.createNewUser = function (req, res) {

	var userInfo = req.body ? req.body : req;
  var queryString = 'CREATE (user:Person {name : {name}, age:{age}, preference:{preference}, bio:{bio}, gender:{gender}, facebookId:{facebookId}, picture:{picture}}) RETURN user';
  db.cypherQuery(queryString, userInfo, function(err, response){
		if(typeof res === 'function'){
			res(response);
		} else {
      if (err) {
      	res.status(404).json(err);
      } else {
        res.status(200).json(response.results[0].data[0].row[0]);
      }
		}
  });
};

module.exports.updateUser = function (req, res) {
	var userInfo = req.body;
	var params = {facebookId: req.body.facebookId};
	var fields = Object.keys(userInfo);
	var stringEnding = ',';
	var queryString = fields.reduce(function(memo, field, index){
		if(index === fields.length-1){
			stringEnding = ' RETURN user';
		}
		memo = memo.concat(' user.' + field + ' = "' + userInfo[field] + '"' + stringEnding);
		return memo;
	}, 'MATCH (user:Person {facebookId : {facebookId}}) SET');
	
	db.cypherQuery(queryString, params, function (err, response) {
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).json(response.results[0].data[0].row[0]);
		}
	});
};

module.exports.getUserById = function(req, res) {
	var facebookId = req.body ? req.body.facebookId : req;
	var queryString = 'MATCH (user:Person {facebookId : {facebookId}}) RETURN user';
	var params = {facebookId: facebookId};
  db.cypherQuery(queryString, params, function (err, response) {
  		if(typeof res === 'function'){
  			res(response.results[0].data[0]);
  		} else {
	      if (err || !response.results[0].data[0]) {
	      	res.status(404).json(err);
	      } else {
	      	res.status(200).json(response.results[0].data[0].row[0]);
	      }
  		}
    }
  );
};

module.exports.deleteUser = function(req, res) {
	var params = {facebookId: req.body.facebookId};
	var queryString = 'MATCH (user:Person {facebookId : {facebookId}}) DETACH DELETE user';
	
	db.cypherQuery(queryString, params, function (err, response) {
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).json(response);
		}
	});
};