var db = require('../db/database.js');


// The createNewUser method automatically creates a new user upon facebook 
// authentication. Here is an example request body.
// 
// 	{
// 	  facebookId: 12345234214,
// 	  access_token: "alkfjqig1934094820jflkn23intjk3tfkj43344k"
// 	  name: "Jack Sparrow",
// 	  age: 45,
// 	  picture: "https://scontent.xx.fbcdn.net/hprofile-xfa1",
// 	  gender: "male",
// 	  preference: "null",
// 	  bio: "null"   
// 	};

module.exports.createNewUser = function (req, res) {
	var userInfo = req.body ? req.body : req;
	userInfo.access_token = userInfo.access_token || '';
  var queryString = 'CREATE (user:Person {name : {name}, age:{age}, preference:{preference}, bio:{bio}, gender:{gender}, facebookId:{facebookId}, picture:{picture}, access_token: {access_token}}) RETURN user';
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

// The request for this object needs to have a facebookId field as well as 
// an access_token field. After the user is verified, you can update any field
// that needs to be updated. Here is an example request body.
// 
//	{
//		facebookId: 12345234214,
//		access_token: "alkfjqig1934094820jflkn23intjk3tfkj43344k"
//		bio: "A developer at Hack Reactor",
//	}
//	
module.exports.updateUser = function (req, res) {
	var userInfo = req.body ? req.body : req;
	var params = {facebookId: userInfo.facebookId};
	var fields = Object.keys(userInfo);
	var stringEnding = ',';
	var queryString = fields.reduce(function(memo, field, index){
		if(index === fields.length-1){
			stringEnding = ' RETURN user';
		} else if (field === 'facebookId'){
			return memo;
		}
		memo = memo.concat(' user.' + field + ' = "' + userInfo[field] + '"' + stringEnding);
		return memo;
	}, 'MATCH (user:Person {facebookId : {facebookId}}) SET');
	
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
	});
};

// This method takes in a user's facebookId and returns the user's profile.
// Here is an example request body.
// 
//  {
// 		facebookId: 12345234214
//  }
//  
  
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

// This method deletes a user from the database.
// Here is an example request body.
// 
//  {
// 		facebookId: 12345234214
//  }
//  

module.exports.deleteUser = function(req, res) {
	var params = req.body ? {facebookId: req.body.facebookId} : req;
	var queryString = 'MATCH (user:Person {facebookId : {facebookId}}) DETACH DELETE user';
	
	db.cypherQuery(queryString, params, function (err, response) {
		if(typeof res === 'function'){
			res(response);
		} else {
			if(err){
				res.status(404).json(err);
			} else {
				res.status(200).json(response);
			}
		}
	});
};