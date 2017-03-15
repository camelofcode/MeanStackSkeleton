/*jslint node: true*/

var express = require('express'),
    path = require('path'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {
    'use strict';

    app.set('views', path.join(config.rootPath, 'public'));
    app.set('view engine', 'pug');
      
    app.use(session({
        secret: 'AAAAB3NzaC1yc2EAAAABJQAAAQEA3IYE/slqQog7HwAcbLKuYc0We74Oxfb1tD+B2cqmN4xT1hqS/HfqMUW2QWVKdDXtkv03DUkMoeRjIvQLYtlB83I6RrSZhkre1RlI9F4/qbHdUo3j8nksRY+DiYdBItWWiSrR26cxo3LCqAEdICqMSrMZ0G1NxxYDRdxp4RgQw9Ec5DbnqIVR3OiGNftr8uqa0nEc7n1VNct86WS5vERliwb8v8s7+juTu4LCd/8aMXbiwjpVIO951SKFPoBHYVrTbau4FMMMWQjKiE292hjJNMUmTAs9jTN1lhvKnOdavBZnK1oHjSfhE2Yp6iBGlwQS0FR5ofGnCzauaoAkmx712Q=='
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    

    app.use(express['static'](path.join(config.rootPath, 'public')));
};
