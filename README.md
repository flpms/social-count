# Social-Count || (Jarvis)

(SSSF) Simple service sum followers
Get data total followers from Twitter and Instagram and send to Slack.

## Requirements

* NodeJS
* NPM
* Forever

## Configuration

In data folder, create a JSON config.

`nano config.json`

And write a JSON like this

```` Javascript
{
    "slack" : {                     
        "hostname" : "hooks.slack.com",             
        "path" : "/services/your/path/hook" 
    },
    "twitter" : {              
        "user_name" : "your_user_name",
        "consumer_key" : "your_key",
        "consumer_secret" : "your_secret",
        "access_token_key" : "your_token",
        "access_token_secret" : "your_token_secret"
    },
    "instagram" : {
        "user_name" : "your_user_name",  
        "client_id" : "your_client_id",                     
        "client_secret" : "your_client_secret",
        "user_id" : UserIDYouWantTracker
    }
}  
````

## Run

In your server run this whit node and forever.

`forever start -C node lib/index.js`

And wait for metrics in your slack.

### Desirable improvements

* Configuration time with arguments in cli.
* An option to a http interface
* More data from other channels like - Google Analytics and Facebook


Made with love and NodeJS
