var request = require("request");
var constants = require('../../constants.js');

var username = 'neo4j';
var password = 'Married0913';
var userPass = new Buffer(username + ":" + password).toString('base64');

// this is the interface between the server and the database
module.exports.cypherQuery = function(query, params, callback) {
  if(params){
    if(typeof params === 'function'){
      callback = params;
      params = {};
    }
  } else {
    params = {};
  }
  request.post({
      uri: constants.DB_URI,
      json: {statements: [{statement: query, parameters: params}]},
      headers: {               
        'Authorization': 'Basic ' + userPass                  
      }, 
    },
    function (err, res, body) {
      callback(err, body);
    });
};