var https = require('https');

var Token = require('./get-token.js');
var config = require('../data/');

var _auth = function() {

};

var _info = function() {

    return {
        followers : _followers
        date : new Date.now()
    };
};

module.exports = {
    info: _info
};