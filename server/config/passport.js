var passport = require('passport');
var accountControllers = require('../controllers/accountControllers.js');
var constants = require('../../constants.js');
var db = require('../db/database.js');
var BearerStrategy = require('passport-http-bearer');

  
passport.use(new BearerStrategy(
  function(token, done) {
    var query = "MATCH (user:Person {access_token : {token}}) RETURN user";
    db.cypherQuery(query, {token : token}, function(err, response){
        if(err) {
            return done(err);
        }
        var user = response.results[0].data[0];
        if(!user) {
            return done(null, false);
        }
        return done(null, response);
    });
  })
);