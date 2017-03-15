/*jslint node: true*/
var TextPage = require('mongoose').model('TextPage');
var auth = require('../../authentication/auth');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function (app) {
    'use strict';

    app.get('/api/textPage/*', function (req, res) {
        TextPage.findOne({
            pageId: req.params[0]
        }).exec(function (err, pageText) {
            res.send(pageText);
        });
    });

    app.put('/api/textPage/:id', auth.requiresApiLogin, jsonParser, function (req, res) {
        TextPage.findOne({
            pageId: req.params.id
        }).exec(function (err, pageText) {
            pageText.text = req.body.text;
            pageText.save(function (err) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    });
};
