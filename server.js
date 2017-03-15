/*jslint node: true*/
'use strict';

var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

var app = express();

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app, config);
require('./server/authentication/passport')();

require('./server/data/seed')();

if (!config.useLetsEncrypt) {
    app.listen(config.port);
    console.log('Listening on ' + config.port);
} else {
    var lex = require('greenlock-express').create({
        server: config.letsEncryptServer,

        challenges: {
            'http-01': require('le-challenge-fs').create({
                webrootPath: '/tmp/acme-challenges'
            })
        },
        store: require('le-store-certbot').create({
            webrootPath: '/tmp/acme-challenges'
        }),

        approveDomains: function (opts, certs, cb) {
            console.log(opts.domains);
            var i;
            for (i = 0; i < opts.domains.length; i += 1) {
                if (opts.domains[i] !== "www.esotericuk.net" && opts.domains[i] !== "esotericuk.net") {
                    console.log(opts.domains[i] + " was refused!");
                    return;
                }
            }

            if (certs) {
                opts.domains = certs.altnames;
            } else {
                opts.email = 'n0652640@googlemail.com';
                opts.agreeTos = true;
            }

            cb(null, {
                options: opts,
                certs: certs
            });
        }
    });

    require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
        console.log("Listening for ACME http-01 challenges on", this.address());
    });

    require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
        console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
    });
}

