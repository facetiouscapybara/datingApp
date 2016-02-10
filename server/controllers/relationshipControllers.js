var db = require('../db/database.js');
 
// The createRelationship method creates a directed edge between two users. It takes a
// userId, targetId, and a relationship in the request object. Creating a relationship that points from the user to to the
// target.
// The return value is the relationship data returned from the database.
module.exports.createRelationship = function(req, res) {
  var params = req.body;
  var queryString = 'MATCH (user:Person {facebookId : {userId}}), (target:Person {facebookId : {targetId}}) CREATE (user)-[tag:' + params.relationship + ' ]-> (target) RETURN tag';
  db.cypherQuery(queryString, params, function(err, response){
    if(err){
      res.status(404).json(err);
    } else {
      res.status(201).json(response.results[0]);
    }
  });
};

// example request body object for the createRelationship method. 
      // {
      //   userId: "32416340",
      //   targetId: "123451654",
      //   relationship: "friends"
      //  }

// The deleteRelationship method takes a request body object with userId, targetId, and relationship information and deletes the relationship from the database.
// The response object is just confirmatio from the database that the relationship is deleted.
module.exports.deleteRelationship = function(req, res) {
  var params = {
    userId : req.body.userId,
    targetId : req.body.targetId
  };
  var queryString = 'MATCH (user:Person {facebookId : {userId}})-[rel:' + req.body.relationship + ']->(target:Person {facebookId : {targetId}}) DELETE rel';
  db.cypherQuery(queryString, params, function(err, response){
    if(err){
      res.status(404).json(err);

    } else {
      res.status(201).json(response);
    }
  });
};

   // example request body object for the delete relationship method.
      // {
      //  userId: 32416340,
      //  targetId: 123451654,
      //  relationship: "friends",
      // } 

  
 
 // The getUserInArea method references the database to ensure that the second user is not blocked or
 // selected by the user, or that the second person has not blocked the user.
 // If the user information passes the filter, it is returned in the body of the response object
 // Instead of keeping the information in the request body, the request needs
 // to have the information stored in the url in the form of a query string.
 // The query string needs to have an id parameter as well as a userInArea
 // parameter. 
module.exports.getUserInArea = function (req, res) {
  var params = {
    facebookId : req.query.id,
    targetId : req.query.userInArea
  };
  var queryString = 'MATCH (user:Person {facebookId : {facebookId} }), (target:Person {facebookId: {targetId} }) WHERE NOT user-[:blocked]-target AND NOT user-[:selected]-target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err || !response.results[0].data[0]){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data[0].row[0]);
    }
  });
};

  // example query for the getUserInArea method. 
    // GET "https://powerful-sea-68331.herokuapp.com/api/users/?id=819234724078&userInArea=2986437245"
   
// Gets all users that are associated with another user based on a specified
// relationship regardless of the direction of the relationship. The
// information needs to be added to the url as query parameters. The response is an array
// of user profiles.
module.exports.getConnections = function (req, res) {
  var params = {
    facebookId : req.query.id,
    relationship : req.query.relationship
  };
  var queryString = 'MATCH (user:Person {facebookId : {facebookId} }), (target:Person) WHERE user-[:' + params.relationship + ']-target return target';
  db.cypherQuery(queryString, params, function (err, response) {
    if(err){
      res.status(404).json(err);
    } else {
      res.status(200).json(response.results[0].data);
    }
  });
};

   //example query for the get connections method. 
    // GET "https://powerful-sea-68331.herokuapp.com/api/relationship/?id=819234724078&relationship=friends"
    // 
    // 