var db = require('../db/database.js');

// This method creates a directed edge between two users. It takes a userId
// and targetId and has the edge pointing from the user to to the target 
// ex.
// 
//  (user)-[follows]->(target) 
//  
// In this example, the user is following the target, but the target is not following the user
// Here is an example request body.
// 
// {
//  userId: 32416340,
//  targetId: 123451654,
//  relationship: "friends",
//  tag : "college", OPTIONAL
//  relationshipData: {strength: 5} OPTIONAL this is just any additional data associated with the relationship
// }

module.exports.createRelationship = function(req, res) {

	var params = req.body;
	params.tag = params.tag || 'tempTag';
  params.relationshipData = req.body.relationshipData || {};

  var queryString = 'MATCH (user:Person {id : {userId}}), (target:Person {id : {targetId}}) CREATE (user)-[' + params.tag + ':' + params.relationship + ' {relationshipData}]-> (target) RETURN ' + params.tag;
  db.cypherQuery(queryString, params, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(201).json(response.results[0]);
  	}
  });
};

// This method deletes a directed relatinship It takes a userId and targetId
// as well as a relationship. Here is an example request body.
// 
// {
//  userId: 32416340,
//  targetId: 123451654,
//  relationship: "friends",
// }

module.exports.deleteRelationship = function(req, res) {
  var params = {
    userId : req.body.userId,
    targetId : req.body.targetId
  };
  var queryString = 'MATCH (user:Person {id : {userId}})-[rel:' + req.body.relationship + ']->(target:Person {id : {targetId}}) DELETE rel';
  db.cypherQuery(queryString, params, function(err, response){
    if(err){
      res.status(404).json(err);

    } else {
  		res.status(201).json(response);
  	}
  });
};

// This method takes a userId and an usersInArea array and returns an array of user profiles who aren't blocked or currently selected
// Here is an example request body.
// 
// {
//   userId : 38925347,
//   usersInArea : [43253445, 54677564, 23542435, 98023432]
// }
// 

module.exports.getEligibleUsersInArea = function (req, res) {
  var params = {
    id : req.query.id,
    usersInArea : req.query.usersInArea
  };
  var queryString = 'MATCH (user:Person {id : {id} }), (target:Person) WHERE target.id IN {usersInArea} AND NOT user-[:blocked]-target AND NOT user-[:selected]-target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data);
    }
  });
};

// This method takes a userId and a relationship and returns an array of users who are connected to the user by the 
// desired relationship. This doesn't take into consideratin the direction of the relationship.
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
//    userId : 52473892,
//    relationship : "selected"
//  };
//  
module.exports.getConnections = function (req, res) {
  var params = req.body;
  var queryString = 'MATCH (user:Person {id : {userId} }), (target:Person) WHERE user-[:' + params.relationship + ']-target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data);
    }
  });
};

