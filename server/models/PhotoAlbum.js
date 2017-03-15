/*jslint node: true*/
var mongoose = require('mongoose');

var photoAlbumSchema = mongoose.Schema({
    title: {
        type: String,
        required: '{PATH} is required!'
    },
    date: {
        type: Date,
        required: '{PATH} is required!'
    },
    url: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    photos: [
        {
            caption: String,
            imagePath: {
                type: String,
                required: '{PATH} is required!'
            }
        }]
});

photoAlbumSchema.pre('save', function (next) {
    'use strict';
    var self = this;

    self.url = self.title.toLowerCase().replace(/[\W_]+/g, '-');

    next();
});

mongoose.model('PhotoAlbum', photoAlbumSchema);
