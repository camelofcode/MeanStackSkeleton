/*jslint node: true, nomen: true*/

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/meanstackskeleton',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        letsEncrypt: {
            enabled: false,
            server: 'staging',
            whiteList: 'localhost',
            approver: 'myemail@mydomain.com'
        }
    },
    live: {
        db: 'mongodb://localhost/meanstackskeleton',
        rootPath: rootPath,
        port: process.env.PORT || 80,
        letsEncrypt: {
            enabled: true,
            server: 'https://acme-v01.api.letsencrypt.org/directory',
            whiteList: 'yourdomain.com;www.yourdomain.com',
            approver: 'myemail@mydomain.com'
        }
    }
};
