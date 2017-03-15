/*jslint node: true, nomen: true*/
var fileUploadService = require('../../services/fileUploadService');
var auth = require('../../authentication/auth');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

module.exports = function (app, config) {
    'use strict';

    app.post('/api/imageUpload', auth.requiresApiLogin, upload.single('image'), function (req, res) {
        var path = fileUploadService.saveImage(req.file);
        if (path) {
            res.send(path);
        } else {
            res.sendStatus(500);
        }
    });
};
