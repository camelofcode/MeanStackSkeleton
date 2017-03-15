/*jslint node: true*/
var mongoose = require('mongoose');

var myModelSchema = mongoose.Schema({
    title: {
        type: String,
        required: '{PATH} is required!'
    },
    description: {
        type: String
    },
    imagePath: {
        type: String
    },
    date: {
        type: Date
    },
    url: {
        type: String,
        unique: true
    }
});

myModelSchema.pre('save', function (next) {
    'use strict';
    var self = this;

    var title = self.title.toLowerCase().replace(/[\W_]+/g, '-');

    self.url = `${title}-${self.date.getDate()}-${self.date.getMonth() + 1}-${self.date.getFullYear()}`;

    next();
});

mongoose.model('MyModel', myModelSchema);
