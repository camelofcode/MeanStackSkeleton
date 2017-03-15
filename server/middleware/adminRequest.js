exports.append = function (req, res, next) {
    'use strict';

    req.isAdmin = req.headers.referer.toLowerCase().indexOf('admin') > -1 && req.isAuthenticated();
    next();
};