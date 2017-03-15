/*jslint node: true*/
var User = require('mongoose').model('User');
var auth = require('../../authentication/auth');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var credential = require('credential');
var pw = credential();
var _ = require('underscore');

module.exports = function (app) {
    'use strict';

    app.get('/api/user/', auth.requiresApiLogin, function (req, res) {
        'use strict';

        User.find({}).sort({
            title: 1
        }).exec(function (err, collection) {
            res.send(_.map(collection, function (user) {
                return {
                    _id: user._id,
                    username: user.username,
                    password: '',
                    confirmedPassword: ''
                };
            }));
        });
    });

    app.post('/api/user', auth.requiresApiLogin, jsonParser, function (req, res) {
        'use strict';

        if (req.body.password !== req.body.confirmedPassword) {
            res.sendStatus(500);
        }

        pw.hash(req.body.password, function (err, hash) {
            if (err) {
                res.sendStatus(500);
            }

            User.create({
                username: req.body.username,
                hashedPassword: hash
            });

            res.sendStatus(201);
        });
    });

    app.put('/api/user/:id', auth.requiresApiLogin, jsonParser, function (req, res) {
        'use strict';

        if (req.body.password !== req.body.confirmedPassword) {
            res.sendStatus(500);
        }

        User.findById(req.params.id, function (err, user) {

            pw.hash(req.body.password, function (err, hash) {
                if (err) {
                    res.sendStatus(500);
                }

                user.username = req.body.username;
                user.hashedPassword = hash;

                user.save(function (err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });
        });
    });

    app.delete('/api/user/:id', auth.requiresApiLogin, jsonParser, function (req, res) {
        'use strict';

        User.findById(req.params.id, function (err, user) {
            User.remove({
                _id: req.params.id
            }).exec(function (err) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    });
};
