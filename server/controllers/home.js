/*jslint node: true*/
module.exports = function (app, config) {
    'use strict';

    app.get('/partials/*', function (req, res) {
        res.render('public/pages/' + req.params[0]);
    });

    app.get('*', function (req, res) {
        res.render('public/index', {});
    });
};
