import FBSDKCore , { FBSDKGraphRequest, FBSDKAccessToken } from 'react-native-fbsdkcore/';
import FBSDKShare from 'react-native-fbsdkshare/';
import FBSDKLogin, { FBSDKLoginButton } from 'react-native-fbsdklogin/';

let fb = {

	fbProfile(callback){
		var fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
		  if (error) {
		    alert('Error making request.');
		  } else {
		    // Data from request is in result
		    FBSDKAccessToken.getCurrentAccessToken((token) => {
		      console.log(token.tokenString);
		      var url = "https://graph.facebook.com/" + result.id + "?fields=id,name,age_range,email,first_name,gender,picture&access_token=" + token.tokenString;
		      fetch(url)
		        .then(function (res) {
		          callback(JSON.parse(res._bodyText));
		        })
		        .catch(function (err) {
		          console.log(err);
		        });
		    });
		    
		  }
		}, '/me?fields=id,age_range,email,first_name,gender');
		fetchFriendsRequest.HTTPMethod = "GET";
		return fetchFriendsRequest.start();
	},

	fbToken(callback){
    return FBSDKAccessToken.getCurrentAccessToken((token) => {
    	callback(token);
		});
	}

}

export default fb;

