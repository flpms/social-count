var OAuth = require('oauth');

var getToken = function(data, callback) {

	var OAuth2 = OAuth.OAuth2;
	var oauth2 = new OAuth2(data.clientKey, data.clientSecret, data.tokenPoint);
	

}