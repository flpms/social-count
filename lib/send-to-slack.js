var https = require('https');
var querystring = require('querystring');
var moment = require('moment');

moment.locale('pt-br');

var slack = {
    send : function(data, callback) {

        var postData, stringToSend, options, req;

        postData = {
            "text": data.message,
            "icon_emoji" : ":chart_with_upwards_trend:"
        };

        stringToSend = JSON.stringify(postData);

        console.info('\tConverted to JSON');

        options = {
            hostname: data.config.hostname,
            path: data.config.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        req = https.request(options, function(res) {
            var timeObject;

            res.setEncoding('utf8');

            timeObject = setTimeout(function() {
                callback(new Error('Execution timeout, data probally not send'));
            }, 40000);

            res.on('data', function(dt) {

                clearTimeout(timeObject);

                callback(null, dt);
            }).on('error', function(err) {
                callback(err);
            });
        });

        req.write(stringToSend);
        req.end();

        req.on('error', function(e) {
            callback(new Error(e));
        });
    },
    formmatingMessage :  function(data, callback) {

        console.info('\tFormat Message');

        var msg, _data;

        msg =  "```- - - RELATÓRIO DÍARIO - - -\n"+
        moment.tz(moment().format('LLLL'), 'America/Sao_paulo') +
        "\nInstagram:\n" +
        "\u0020\u0020Seguidores: " + data.instagram.seguidores + "\n" +
        "\u0020\u0020Postagens: " + data.instagram.postagens_total + "\n" +
        "Twitter:\n\u0020\u0020Postagens: " + data.twitter.postagens_total + "\n" +
        "\u0020\u0020Seguidores: " + data.twitter.seguidores + "\n" +
        "\u0020\u0020Adicionado em " + data.twitter.listado + " listas\n" +
        "- - - - - - - - - - - - - - -\nTotal Twitter e Instagram: " + 
        (data.twitter.seguidores + data.instagram.seguidores) + "```";

        _data = {
            config : data.config.slack,
            message : msg
        }

        callback(_data);
    }
};

module.exports = slack;  
