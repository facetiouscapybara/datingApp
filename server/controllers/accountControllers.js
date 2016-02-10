var db = require('../db/database.js');


// The getAllUsers method returns all of the users in the database, 
// it doesn't take any query parameters. 
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

// The createNewUser method takes a new user's profile information and writes it to the database. If a user has not filled 
// out all of the fields, the fields left blank are replaced by "". This ensures that the field is available for the user to 
// update later. The req argument can also be a javaScript object so this method can be used for multiple purposes. If a callback is 
// needed, it can be passed in as the res argument, and will be invoked on the response from the database.
createNewUser = function (req, res) {
  var userInfo = req.body ? req.body : req;
  userInfo.access_token = userInfo.access_token || '';
  var queryString = 'CREATE (user:Person {name : {name}, first_name : {first_name}, age:{age}, preference:{preference}, industry: {industry}, education : {education}, bio:{bio}, gender:{gender}, facebookId:{id}, picture:{picture}, access_token: {access_token}}) RETURN user';
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

// Here is a sample request body for the createNewUser method.
  // {
  //   id: 12345234214,
  //   access_token: "alkfjqig1934094820jflkn23intjk3tfkj43344k"
  //   name: "Jack Sparrow",
  //   age: 45,
  //   first_name: "Jack"
  //   picture: "https://scontent.xx.fbcdn.net/hprofile-xfa1",
  //   gender: "male",
  //   preference: "women",
  //   bio: "I like to hijack boats for a living",
  //   industry: "Pirating",
  //   education: "None"   
  // }
  
// The update user method takes an existing user's facebookId and updates the properties specified in the 
// req object. If the properties in the req object aren't present on the user's node in the database, 
// nothing will be updated and the method will return an error. The req argument can also be a javaScript
// object so this method can be used for multiple purposes. If a callback is needed, it can be passed in as 
// the res argument, and will be invoked on the response from the database.
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

// Here is an example request body for the updateUser method
  // {
  //   id: 12345234214,
  //   access_token: "alkfjqig1934094820jflkn23intjk3tfkj43344k"
  //   bio: "A developer at Hack Reactor",
  // }

// This method takes in a user's facebookId and returns the user's information from the database.
// The user's facebookId needs to be stored in the request's path. The req argument can also be a 
// javaScript object so this method can be used for multiple purposes. If a callback is needed, it 
// can be passed in as  the res argument, and will be invoked on the response  from the database.
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

// Here is a sample query for the getUserById method
  // GET "https://powerful-sea-68331.herokuapp.com/api/users/98360534171235"
  
// This method takes in a user's facebookId and deletes the user's information from the database.
// The user's facebookId needs to be stored in the request's path. The req argument can also be a 
// javaScript object so this method can be used for multiple purposes. If a callback is needed, it 
// can be passed in as  the res argument, and will be invoked on the response  from the database.
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

// Here is a sample query for the deleteUser method
  // DELETE "https://powerful-sea-68331.herokuapp.com/api/users/98360534171235"

// The signIn method is called when the user signs into the app. It first takes the user's 
// facebookId and queries the database to see if the user is new to the app. If the user is
// new, the createNewUser method is invoked and the user is created. If the user is returning, 
// the updateUser method is invoked to update the the user's access_token in the database to 
// reflect the new access_token facebook generated upon signing in.
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