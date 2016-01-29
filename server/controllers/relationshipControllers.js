var db = require('../db/database.js');

// This method creates a directed edge between two users. It takes a userFacebookId
// and targetFacebookId and has the edge pointing from the user to to the target 
// ex.
// 
//  (user)-[follows]->(target) 
//  
// In this example, the user is following the target, but the target is not following the user
// Here is an example request body.
// 
// {
//  userFacebookId: 32416340,
//  targetFacebookId: 123451654,
//  relationship: "friends",
//  userLocation : tuple of coordinates,
//  targetLocation : tuple of coordinates
// }

module.exports.createRelationship = function(req, res) {

	var params = req.body;
  params.relationshipData = {
    timeStamp : new Date(),
    userLocation : req.body.userLocation || '',
    targetLocation : req.body.targetLocation || ''
  };

  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId}}), (target:Person {facebookId : {targetFacebookId}}) CREATE (user)-[rel:' + params.relationship + ' {relationshipData}]-> (target) RETURN rel';
  db.cypherQuery(queryString, params, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(201).json(response.results[0]);
  	}
  });
};

// This method deletes a directed relatinship It takes a userFacebookId and targetFacebookId
// as well as a relationship. Here is an example request body.
// 
// {
//  userFacebookId: 32416340,
//  targetFacebookId: 123451654,
//  relationship: "friends",
// }

module.exports.deleteRelationship = function(req, res) {
  var params = {
    userFacebookId : req.body.userFacebookId,
    targetFacebookId : req.body.targetFacebookId
  };
  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId}})-[rel:' + req.body.relationship + ']->(target:Person {facebookId : {targetFacebookId}}) DELETE rel';
  db.cypherQuery(queryString, params, function(err, response){
    if(err){
      res.status(404).json(err);

    } else {
  		res.status(201).json(response);
  	}
  });
};

// This method takes a userFacebookId and an usersInArea array and returns an array of user profiles who aren't blocked or currently selected
// Here is an example request body.
// 
// {
//   userFacebookId : 38925347,
//   usersInArea : [43253445, 54677564, 23542435, 98023432]
// }
// 

module.exports.getEligibleUsersInArea = function (req, res) {
  var params = req.body;
  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId} }), (target:Person) WHERE target.facebookId IN {usersInArea} AND NOT user-[:blocked]-target AND NOT user-[:selected]-target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data);
    }
  });
};

// This method takes a userFacebookId and a relationship and returns an array of users who are connected to the user by the 
// desired relationship. This does take a directional input into consideration.
// 
// ex. 
//  if you wanted to get all of the people a user acknowledges as a friend as well as all of the people who
//  acknowledge the user as a friend. 
//  
//  In the database, we have two relationships
//  
//  (user)-[friends]->(person1) 
//  (person2)-[friends]->(user) 
//  
//  This method would return an array with person1 and person2.
//  
//  Here is an example request body.
//  
//  {
//    userFacebookId : 52473892,
//    relationship : "selected",
//    direction : "undirected"      The options are "atUser", "atTarget", or "undirected"
//  };
//  
module.exports.getConnections = function (req, res) {

  var params = req.body;
  var userDirection = '';
  var targetDirection = '';
  if(req.body.direction === 'atUser'){
    userDirection = '<';
  } else if (req.body.direction === 'atTarget'){
    targetDirection = '>';
  }

  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId} }), (target:Person) WHERE user ' + userDirection + '-[:' + params.relationship + ']-' + targetDirection + 'target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data);
    }
  });
};

