/*jslint node: true*/
exports.requiresLogin = function (req, res, next) {
    'use strict';

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/Admin/Login');
};

exports.requiresApiLogin = function (req, res, next) {
    'use strict';

    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};