var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var accountControllers = require('../controllers/accountControllers.js');
var constants = require('../../constants.js');
var db = require('../db/database.js');
var BearerStrategy = require('passport-http-bearer');

module.exports = function(){

	passport.use(
		new FacebookStrategy({
			clientID: constants.FACEBOOK_APP_ID,
			clientSecret: constants.FACEBOOK_APP_SECRET,
	    callbackURL: constants.CALLBACK_URL,
	    enableProof: true,
	    profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    process.nextTick(function () {
	    	accountControllers
	        .getUserById(profile.id, function(user){
            if (user){
            	var newToken = {
            		facebookId : profile.id,
            		access_token: accessToken
            	};
              accountControllers.updateUser(newToken, function(res){
	              user.gender = profile._json.gender;
	              done(null, user);
              });
            } else {
              accountControllers.createNewUser({
                facebookId: profile.id,
                name: profile.displayName,
                picture: profile.photos[0].value,
                gender: profile._json.gender,
                preference: "null",
                bio: "null",
                age: "null",
                access_token : accessToken
              }, function(newUser){
              	done(null, newUser);
              });
           }
	        });
	     });
	    }
	));
	passport.use(
	  new BearerStrategy(
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
	    }
	  )
	);
};
