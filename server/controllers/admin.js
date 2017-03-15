/*jslint node: true*/
var auth = require('../authentication/auth');
var passport = require('passport');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function (app, config) {
    'use strict';

    app.get('/admin/login', function (req, res) {
        res.render('admin/login', {});
    });

    app.get('/admin/logout', function (req, res) {
        req.logout();
        res.redirect('/Admin/Login');
    });

    app.post('/admin/login', urlencodedParser, passport.authenticate('local', {
        successRedirect: '/Admin',
        failureRedirect: '/Admin/Login',
        failureFlash: false
    }));

    app.get('/admin/partials/*', auth.requiresApiLogin, function (req, res) {
        res.render('admin/pages/' + req.params[0]);
    });

    app.get('/admin*', auth.requiresLogin, function (req, res) {
        res.render('admin/index', {});
    });
};
