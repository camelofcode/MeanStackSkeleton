/*jslint node: true*/

module.exports = function (app, config) {
    'use strict';

    require('../controllers/admin')(app, config);

    var normalizedPath = require('path').join(__dirname, '../controllers/api');
    require('fs').readdirSync(normalizedPath).forEach(function (file) {
        require('../controllers/api/' + file)(app, config);
    });

    require('../controllers/home')(app, config);
};
