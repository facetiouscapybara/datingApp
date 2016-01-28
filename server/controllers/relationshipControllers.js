var db = require('../db/database.js');

// The queryParams for createRelationship need to have all of these properties.
// {
//  userId: 10,
//  endId: 11,
//  tag: 'family',
//  relationship: 'friends',
//  relationshipData: {strength: 5}
// }

module.exports.createRelationship = function(req, res) {

	var params = req.body;
	params.tag = params.tag || 'tempTag';
  params.relationshipData = req.body.relationshipData || {};

  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId}}), (target:Person {facebookId : {targetFacebookId}}) CREATE (user)-[' + params.tag + ':' + params.relationship + ' {relationshipData}]-> (target) RETURN ' + params.tag;
  db.cypherQuery(queryString, params, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(201).json(response.results[0]);
  	}
  });
};

module.exports.deleteRelationship = function(req, res) {
  var params = {
    userFacebookId : req.body.userFacebookId,
    targetFacebookId : req.body.targetFacebookId
  };
  console.log(req.body.relationship)
  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId}})-[rel:' + req.body.relationship + ']->(target:Person {facebookId : {targetFacebookId}}) DELETE rel';
  db.cypherQuery(queryString, params, function(err, response){
    if(err){
      res.status(404).json(err);

    } else {
  		res.status(201).json(response);
  	}
  });
};

module.exports.getEligibleUsersInArea = function (req, res) {
  var params = req.body;
  var queryString = 'MATCH (user:Person {facebookId : {facebookId} }), (target:Person) WHERE target.facebookId IN {usersInArea} AND NOT user-[:blocked]-target AND NOT user-[:selected]-target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data);
    }
  });
};

module.exports.getConnections = function (req, res) {
  var params = req.body;
  var queryString = 'MATCH (user:Person {facebookId : {facebookId} }), (target:Person) WHERE user-[:' + params.relationship + ']-target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data);
    }
  });
};

