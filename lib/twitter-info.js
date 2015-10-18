var Twitter = require('twitter');

var info = function(configTwitter, callback) {

    var twitter = new Twitter({
        consumer_key: configTwitter.consumer_key,
        consumer_secret: configTwitter.consumer_secret,
        access_token_key: configTwitter.access_token_key,
        access_token_secret: configTwitter.access_token_secret
    });
 
    twitter.get('users/show', { screen_name : configTwitter.user_name}, callback);
};

module.exports = {
    info: info
};