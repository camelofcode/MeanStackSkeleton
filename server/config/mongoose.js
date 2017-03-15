/*jslint node: true*/
var mongoose = require('mongoose');

module.exports = function (config) {
    'use strict';

    var normalizedPath = require('path').join(__dirname, '../models');

    require('fs').readdirSync(normalizedPath).forEach(function (file) {
        require('../models/' + file);
    });

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('db open');
    });
};
