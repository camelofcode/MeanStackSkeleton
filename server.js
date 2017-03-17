/*jslint node: true*/
'use strict';

var express = require('express'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env],
    app = express();

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app, config);
require('./server/authentication/passport')();
require('./server/data/seed')();
require('./server/config/letsEncrypt')(app, config);



