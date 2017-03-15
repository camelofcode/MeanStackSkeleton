/*jslint node: true, vars: true*/
var path = require('path'),
    fs = require('fs'),
    uuid = require('uuid');

module.exports.saveImage = function (file) {
    'use strict';

    var ext = path.extname(file.originalname);

    if (['.png', '.gif', '.jpg', '.jpeg'].indexOf(ext.toLowerCase()) === -1) {
        return null;
    }

    var dir = path.join('public', 'img', 'upload');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var storedName = uuid.v4() + ext;
    var storedPath = path.join(dir, storedName);

    fs.writeFile(storedPath, file.buffer);

    return '/img/upload/' + storedName;
};

module.exports.removeImage = function(file) {
    var fullPath = path.join('public', 'img', 'upload', file.split('/')[3]);

    fs.unlink(fullPath,
        function(err) {
            if (err) {
                console.log(err);
            }
        });
}