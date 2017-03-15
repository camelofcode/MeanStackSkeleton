/*jslint node: true, nomen: true*/

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/meanstackskeleton',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        useLetsEncrypt: false,
        letsEncryptServer: 'staging',
    },
    live: {
        db: 'mongodb://localhost/meanstackskeleton',
        rootPath: rootPath,
        port: process.env.PORT || 80,
        useLetsEncrypt: true,
        letsEncryptServer: 'https://acme-v01.api.letsencrypt.org/directory'
    }
};
