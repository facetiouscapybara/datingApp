var db = require('../db/database.js');

// The queryParams for createRelationship need to have all of these properties.
// {
//  userId: 10,
//  endId: 11,
//  tag: 'family',
//  relationship: 'HELLO',
//  relationshipData: {strength: 5}
// }

module.exports.createRelationship = function(req, res) {

	var queryData = req.body.queryData;
	queryData.tag = queryData.tag || '';
  var params = {
    data: queryData.relationshipData,
    userId : queryData.userId,
    endId : queryData.endId
  };

  var queryString = 'START startingUser=node({userId}), endingUser=node({endId}) CREATE (startingUser)-[' + queryData.tag + ':' + queryData.relationship + ' {data}]-> (endingUser) RETURN ' + queryData.tag;
  db.cypherQuery(queryString, params, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(201).json(response);
  	}
  });
};

module.exports.deleteRelationship = function(req, res) {

	var queryData = req.body.queryData;
  var params = {
    userId : queryData.userId,
    endId : queryData.endId
  };

  var queryString = 'START user=node({userId}), endUser=node({endId}) MATCH user-[rel:' + queryData.relationship + ']->endUser DELETE rel';
  db.cypherQuery(queryString, params, function(err, response){
  	if(err){
  		res.status(404).json(err);
  	} else {
  		res.status(201).json(response);
  	}
  });
};
