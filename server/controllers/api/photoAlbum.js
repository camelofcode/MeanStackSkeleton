/*jslint node: true, es5:true*/
var PhotoAlbum = require('mongoose').model('PhotoAlbum');
var auth = require('../../authentication/auth');
var adminRequest = require('../../middleware/adminRequest');
var fileUploadService = require('../../services/fileUploadService');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function (app) {
    'use strict';

    app.get('/api/photoAlbum/', adminRequest.append, function (req, res) {
        PhotoAlbum.find({})
            .sort({
                date: -1
            }).exec(function (err, collection) {
                if (req.isAdmin) {
                    res.send(collection);
                } else {
                    res.send(collection.map(function (photoAlbum) {
                        return {
                            url: photoAlbum.url,
                            title: photoAlbum.title,
                            description: photoAlbum.description,
                            coverPhotoPath: photoAlbum.photos[0].imagePath
                        }
                    }));
                }
            });
    });

    app.get('/api/photoAlbum/*', function (req, res) {
        PhotoAlbum.findOne({
            url: req.params[0].toLowerCase()
        }).exec(function (err, photoAlbum) {
            if (!photoAlbum) {
                res.sendStatus(404);
                return;
            }

            res.send(photoAlbum);
        });
    });

    app.post('/api/photoAlbum', auth.requiresApiLogin, jsonParser, function (req, res) {
        var i,
            data = req.body,
            photoAlbum = {
                title: data.title,
                description: data.description,
                photos: [],
                date: new Date()
            };

        for (i = 0; i < data.photos.length; i += 1) {
            photoAlbum.photos.push({
                imagePath: data.photos[i].imagePath,
                caption: data.photos[i].caption
            });
        }

        PhotoAlbum.create(photoAlbum, function(err) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            if (data.removedPhotos) {
                for (i = 0; i < data.removedPhotos.length; i += 1) {
                    fileUploadService.removeImage(data.removedPhotos[i].imagePath);
                }
            }
            res.sendStatus(201);
        });


    });

    app.put('/api/photoAlbum/:id', auth.requiresApiLogin, jsonParser, function (req, res) {
        PhotoAlbum.findById(req.params.id, function (err, photoAlbum) {
            var i,
                data = req.body,
                photos = [];

            for (i = 0; i < data.photos.length; i += 1) {
                photos.push({
                    imagePath: data.photos[i].imagePath,
                    caption: data.photos[i].caption
                });
            }

            photoAlbum.title = data.title;
            photoAlbum.description = data.description;
            photoAlbum.photos = photos;

            photoAlbum.save(function (err) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });

            if (data.removedPhotos) {
                for (i = 0; i < data.removedPhotos.length; i += 1) {
                    fileUploadService.removeImage(data.removedPhotos[i].imagePath);
                }
            }
        });
    });

    app.delete('/api/photoAlbum/:id', auth.requiresApiLogin, function (req, res) {
        PhotoAlbum.findById(req.params.id,
            function (err, photoAlbum) {

                for (var i = 0; i < photoAlbum.photos.length; i++) {
                    fileUploadService.removeImage(photoAlbum.photos[i].imagePath);
                }

                PhotoAlbum.remove({
                    _id: req.params.id
                }).exec(function (err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });
    });
};
