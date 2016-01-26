var request = require("request");

var host = 'localhost',
port = 7474;

var username = 'neo4j';
var password = 'Married0913';
var userPass = new Buffer(username + ":" + password).toString('base64');
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';

// this is the interface between the user and the database
module.exports.cypherQuery = function(query, params, callback) {
  // an option to not have to use params.
  if(params){
    if(typeof params === 'function'){
      callback = params;
      params = {};
    }
  } else {
    params = {};
  }

  request.post({
      uri: httpUrlForTransaction,
      json: {statements: [{statement: query, parameters: params}]},
      headers: {               
        'Authorization': 'Basic ' + userPass                  
      }, 
    },
    function (err, res, body) {
      callback(err, body);
    });
};