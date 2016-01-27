var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var accountControllers = require('../controllers/accountControllers.js');
var constants = require('../../constants.js');

module.exports = function(){

passport.use(new FacebookStrategy({
		clientID: constants.FACEBOOK_APP_ID,
		clientSecret: constants.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: true,
    profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']

  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
    	accountControllers
        .getUserById(profile.id, function(user){
           if (user){
             user.name = profile.displayName;
             user.picture = profile.photos[0].value;
             user.gender = profile._json.gender;
             return done(null, user);
           } else {
             accountControllers.createNewUser({
               facebookId: profile.id,
               name: profile.displayName,
               picture: profile.photos[0].value,
               gender: profile._json.gender,
               preference: "null",
               bio: "null",
               age: "null"
             }, function(newUser){
             	return done(null, newUser);
             });
           }
        });
     });
    }
));
}
