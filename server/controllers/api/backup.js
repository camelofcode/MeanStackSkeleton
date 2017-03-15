/*jslint node: true, es5:true*/
var PhotoAlbum = require('mongoose').model('PhotoAlbum');
var MyModel = require('mongoose').model('MyModel');
var TextPage = require('mongoose').model('TextPage');
var User = require('mongoose').model('User');
var auth = require('../../authentication/auth');
var async = require('async');

module.exports = function (app) {
    'use strict';

    app.get('/api/backup/', auth.requiresApiLogin, function (req, res) {
        async.parallel([
            function (callback) {
                PhotoAlbum.find({}).exec(function (err, collection) {
                    callback(null, collection);
                });
            },
            function (callback) {
                MyModel.find({}).exec(function (err, collection) {
                    callback(null, collection);
                });
            },
            function (callback) {
                TextPage.find({}).exec(function (err, collection) {
                    callback(null, collection);
                });
            },
            function (callback) {
                User.find({}).exec(function (err, collection) {
                    callback(null, collection);
                });
            },
        ], function (err, data) {
            if (data[0] && data[1] && data[2] && data[3]) {
                var backup = {
                    PhotoAlbum: data[0],
                    MyModel: data[1],
                    TextPage: data[2],
                    User: data[3]
                };

                var filename = 'Mean Stack Skeleton Site Backup ' + new Date(Date.now()).toUTCString() + '.json';
                var mimetype = 'application/json';
                res.setHeader('Content-Type', mimetype);
                res.setHeader('Content-Disposition', 'attachment; filename=' + filename.replace(/[\s+\,]/g, '_'));

                res.send(JSON.stringify(backup));
            }
        });
    });
};
