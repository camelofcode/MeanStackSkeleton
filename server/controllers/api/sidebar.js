/*jslint node: true, es5:true*/
var MyModel = require('mongoose').model('MyModel');

module.exports = function (app) {
    'use strict';

    app.get('/api/sidebar/', function (req, res) {
        MyModel.find({}).sort({
            date: 1
        }).limit(3)
            .exec(function (err, collection) {
            res.send(collection.map(function (model) {
                return {
                    url: model.url,
                    title: model.title,
                    date: model.date
                }
            }));
        });
    });
};
