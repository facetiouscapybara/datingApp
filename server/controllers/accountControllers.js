var db = require('../db/database.js');

getAllUsers = function (req, res) {
	var query = 'MATCH (user) RETURN user';
	db.cypherQuery(queryString, function(err, response){
		if(err){
			res.status(404).json(err);
		} else {
			res.status(200).josn(response.results[0].data);
		}
	});
};


// The createNewUser method automatically creates a new user upon facebook 
// authentication. Here is an example request body.
// 
	// {
	//   id: 12345234214,
	//   access_token: "alkfjqig1934094820jflkn23intjk3tfkj43344k"
	//   name: "Jack Sparrow",
	//   age: 45,
	//   first_name: "Jack"
	//   picture: "https://scontent.xx.fbcdn.net/hprofile-xfa1",
	//   gender: "male",
	//   preference: "null",
	//   bio: "null"   
	// };

createNewUser = function (req, res) {
	var userInfo = req.body ? req.body : req;
	userInfo.access_token = userInfo.access_token || '';
  var queryString = 'CREATE (user:Person {name : {name}, first_name : {first_name}, age:{age}, preference:{preference}, bio:{bio}, gender:{gender}, facebookId:{id}, picture:{picture}, access_token: {access_token}}) RETURN user';
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

// The request for this object needs to have a id field as well as 
// an access_token field. After the user is verified, you can update any field
// that needs to be updated. Here is an example request body.
// 
//	{
//		id: 12345234214,
//		access_token: "alkfjqig1934094820jflkn23intjk3tfkj43344k"
//		bio: "A developer at Hack Reactor",
//	}
//	
updateUser = function (req, res) {

	var userInfo = req.body ? req.body : req;
	var facebookId = req.params ? req.params.id : req.facebookId;
	var params = { facebookId: facebookId };
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
		console.log(err)
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

// This method takes in a user's id and returns the user's profile.
// Here is an example request body.
// 
//  {
// 		id: 12345234214
//  }
//  
  
getUserById = function(req, res) {
	var facebookId = req.params ? req.params.id : req;
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
// 		id: 12345234214
//  }
//  

deleteUser = function(req, res) {
	var facebookId = req.params ? req.params.id : req;
	var queryString = 'MATCH (user:Person {facebookId : {facebookId}}) DETACH DELETE user';
	var params = { facebookId: facebookId };
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

signIn = function(req, res){
	var userData = req.body;
	    process.nextTick(function () {
        getUserById(userData.id, function(user){
          if (user){
						var newToken = {
							facebookId : userData.id,
							access_token: userData.access_token
						};
            updateUser(newToken, function(updatedUser){
            	updatedUser.row[0].isNewUser = false;
              res.status(201).json(updatedUser.row[0]);
            });
          } else {
            createNewUser(userData, function(newUser){
            	newUser.results[0].data[0].row[0].isNewUser = true;
              res.status(201).json(newUser.results[0].data[0].row[0]);
            });
         }
        });
     });
};

module.exports = {
	signIn : signIn,
	deleteUser : deleteUser,
	getUserById : getUserById,
	createNewUser : createNewUser,
	getAllUsers : getAllUsers,
	updateUser : updateUser
};