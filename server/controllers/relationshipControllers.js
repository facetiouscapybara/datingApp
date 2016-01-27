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

  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId}}), (target:Person {facebookId : {targetFacebookId}}) CREATE (user)-[' + params.tag + ':' + params.relationship + ' {relationshipData}]-> (target) RETURN ' + params.tag;
  db.cypherQuery(queryString, params, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(201).json(response);
  	}
  });
};

module.exports.deleteRelationship = function(req, res) {

	var queryData = req.body;
  var params = {
    userFacebookId : queryData.userFacebookId,
    targetFacebookId : queryData.targetFacebookId
  };

  var queryString = 'MATCH (user:Person {facebookId : {userFacebookId}})-[rel:' + queryData.relationship + ']->(target:Person {facebookId : {targetFacebookId}}) DELETE rel';
  db.cypherQuery(queryString, params, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(201).json(response);
  	}
  });
};
