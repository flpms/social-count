var moment = require('moment');
var twttr = require('./twitter-info.js');
var insgram = require('./instagram-info.js');
var slack = require('./send-to-slack.js');
var config = require('../data/config.json');

var init, twitterResults, instagramResults, _sendMessage, endExec, _execInterval
    i = 0,
    TotalResults = {};

var interval = moment.duration(3, 'minutes'),

twitterResults = function(err, twt, response) {
    if(err) {
        console.info('\t Fail!');
        console.error(err);
        throw err;
    }

    console.info('\t OK!');

    TotalResults.twitter = {
        seguidores: twt.followers_count,
        listado: twt.listed_count,
        postagens_favoritas: twt.favourites_count,
        postagens_total: twt.statuses_count
    }

    console.info('Instagram');

    insgram.info(config.instagram, instagramResults.success, instagramResults.error);  
};

instagramResults = {
    success : function(data, pagination) {
        console.log('\tOK!');

        TotalResults.instagram = {
            seguidores: data.counts.followed_by,
            postagens_total: data.counts.media
        }

        process.nextTick(function() {

            console.info('Slack');

            var dt = TotalResults
            dt.config = config;
            slack.formmatingMessage(dt, _sendMessage);
        });
    },
    error : function(errorMessage, errorObject, caller) {

        console.info('Instagram - Fail!', errorMessage);

        throw new Error(errorMessage, errorObject, caller);
    }
};

_sendMessage = function(data) {

    slack.send(data, endExec);
};

endExec = function(error, sucess) {
    if (error) {
        throw error;
    }

    if (/payload was not valid json/gi.test(sucess)) {
        throw sucess;
    }

    console.info('Slack Response is', sucess);
    console.info('Finalizado com sucesso');
};

init = function() {
    console.log('Twitter');
    twttr.info(config.twitter, twitterResults);
}

console.info('Initializing...');

_execInterval = moment.duration(4, 'hours');

setInterval(init, _execInterval.asMilliseconds());
init();
console.info('Initialized');

process.on('uncaughtException', function (err) {
    console.error(err);
}); 
