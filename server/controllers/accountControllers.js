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

	var userInfo = req.body;
  var queryString = 'CREATE (user:Person {name : {name}, age:{age}, preference:{preference}, bio:{bio}, sex:{sex}}) RETURN user, id(user)';
  db.cypherQuery(queryString, userInfo, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(200).json(response);
  	}
  });
};

module.exports.updateUser = function (req, res) {
	var userInfo = req.body;
	var fields = Object.keys(userInfo);
	var stringEnding = ',';
	var queryString = fields.reduce(function(memo, field, index){
		if(index === fields.length-1){
			stringEnding = ' RETURN user';
		}
		memo = memo.concat(' user.' + field + ' = "' + userInfo[field] + '"' + stringEnding);
		return memo;
	}, 'START user=node('+ req.params.id + ') SET');
	

	db.cypherQuery(queryString, function (err, response) {
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).json(response.results[0].data[0].row[0]);
		}
	});
};

module.exports.getUserById = function(req, res) {
var queryString = 'START user=node({userId}) RETURN user';
var params = {userId: Number(req.params.id)};
  db.cypherQuery(queryString, params, function (err, response) {
      if (err) {
      	res.status(404).json(err);
      } else {
        res.status(200).json(response);
      }
    }
  );
};

module.exports.deleteUser = function(req, res) {
	var params = {userId : Number(req.params.id)};
	var queryString = 'START user=node({userId}) DETACH DELETE user';
	
	db.cypherQuery(queryString, params, function (err, response) {
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).json(response);
		}
	});
};