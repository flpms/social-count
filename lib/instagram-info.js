var instagram = require('instagram-node-lib');

var _info = function(config, success, error) {

    instagram.set('client_id', config.client_id);
    instagram.set('client_secret', config.client_secret);

    instagram.users.info({
        user_id: config.user_id,
        complete: success,
        error: error
    });
};

module.exports = {
    info: _info
};