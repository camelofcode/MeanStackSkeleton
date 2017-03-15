/*jslint node: true, nomen: true*/
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User'),
    credential = require('credential');

module.exports = function () {
    'use strict';

    passport.use(new LocalStrategy(
        function (username, password, done) {
            var pw = credential();

            User.findOne({
                username: username.toLowerCase()
            }).exec(function (err, user) {
                if (err || !user) {
                    return done(null, false, {
                        message: 'Incorrect username or password'
                    });
                } else {
                    pw.verify(user.hashedPassword, password, function (err, isValid) {
                        if (err || !isValid) {
                            return done(null, false, {
                                message: 'Incorrect username or password'
                            });
                        } else {
                            return done(null, user);
                        }
                    });
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
