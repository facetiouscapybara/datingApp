import FBSDKCore , { FBSDKGraphRequest, FBSDKAccessToken } from 'react-native-fbsdkcore/';
import FBSDKShare from 'react-native-fbsdkshare/';
import FBSDKLogin, { FBSDKLoginButton } from 'react-native-fbsdklogin/';

let fb = {
	fbProfile(callback){
		let fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
		  if (error) {
		    alert('Error making request.');
		  } else {
		    // Data from request is in result
		    FBSDKAccessToken.getCurrentAccessToken((token) => {
		      let url = "https://graph.facebook.com/" + result.id + "?fields=id,name,age_range,email,first_name,gender&access_token=" + token.tokenString;
		      fetch(url)
		        .then(function (res) {
		        	let userInfo = JSON.parse(res._bodyText);
		        	console.log(userInfo);
		        	userInfo.access_token = token.tokenString;
		        	//userInfo.picture = userInfo.picture.data.url;
		        	var pictureUrl = "https://graph.facebook.com/" + result.id + "/picture?type=large&redirect=false&access_token=" + token.tokenString;
		        	fetch(pictureUrl)
		        		.then(function (response) {
		        			userInfo.picture = JSON.parse(response._bodyText).data.url;
		        			console.log("in the fetch picture", userInfo);
				          callback(userInfo);
		        		})
		        		.catch(function (err) {
		        			console.log(err);
		        		})
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

