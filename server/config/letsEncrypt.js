/*jslint node: true*/

module.exports = function (app, config) {
    'use strict';

    if (!config.letsEncrypt.enabled) {
        app.listen(config.port);
        console.log('Listening on ' + config.port);
    } else {
        var lex = require('greenlock-express').create({
            server: config.letsEncrypt.server,

            challenges: {
                'http-01': require('le-challenge-fs').create({
                    webrootPath: '/tmp/acme-challenges'
                })
            },
            store: require('le-store-certbot').create({
                webrootPath: '/tmp/acme-challenges'
            }),

            approveDomains: function (opts, certs, cb) {
                var i;
                for (i = 0; i < opts.domains.length; i += 1) {
                    if (config.letsEncrypt.whiteList.indexOf(opts.domains[i]) < 0) {
                        console.log(opts.domains[i] + ' was refused!');
                        return;
                    }
                }

                if (certs) {
                    opts.domains = certs.altnames;
                } else {
                    opts.email = config.letsEncrypt.approver;
                    opts.agreeTos = true;
                }

                cb(null, {
                    options: opts,
                    certs: certs
                });
            }
        });

        require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
            console.log('Listening for ACME http-01 challenges on', this.address());
        });

        require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
            console.log('Listening for ACME tls-sni-01 challenges and serve app on', this.address());
        });
    }
};
