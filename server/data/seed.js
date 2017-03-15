/*jslint node: true, nomen: true*/
var TextPage = require('mongoose').model('TextPage');
var User = require('mongoose').model('User');
var fs = require('fs');
var path = require('path');

module.exports = function () {
    'use strict';

    //Create required upload folders
    var dir = path.join('public', 'img', 'upload');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    User.find({
        username: 'admin'
    }).exec(function (err, collection) {
        if (collection.length === 0) {
            User.create({
                username: 'admin',
                hashedPassword: '{"hash":"Ia48zoKYqJTgMD5UksKVKvv+5HqaieAaEYGzoJnnJqRnSqhPirydIkMJGEqjWoWNP0f5j/g+JtxPMLvoWERDuf04","salt":"GHe6vljNOjvZKEAVVScmN+VqVQUw7ViuVCRsMeReqxmD0iyl9PnXBohB4qDVZmphClmSwfEjBwcXZWfuBt/YzOg3","keyLength":66,"hashMethod":"pbkdf2","iterations":388485}'
            });
        }
    });

    TextPage.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            TextPage.create({
                pageId: 'contact',
                text: '[[CONTACT TEXT HERE]]'
            });
            TextPage.create({
                pageId: 'home',
                text: "[[HOME TEXT HERE]]"
            });
        }
    });
};
