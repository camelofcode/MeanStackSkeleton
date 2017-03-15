/*jslint node: true, es5:true*/
var MyModel = require('mongoose').model('MyModel');
var auth = require('../../authentication/auth');
var fileUpload = require('../../services/fileUploadService');
var adminRequest = require('../../middleware/adminRequest');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

module.exports = function (app) {
    'use strict';

    app.get('/api/myController/', adminRequest.append, function (req, res) {
        MyModel.find({}).sort({
            startDate: 1
        }).exec(function (err, collection) {
            if (req.isAdmin) {
                res.send(collection);
            } else {
                res.send(collection.map(function (model) {
                    return {
                        url: model.url,
                        imagePath: model.imagePath && model.imagePath !== '' ? model.imagePath : '/img/nophoto.jpg',
                        title: model.title
                    }
                }));
            }
        });
    });

    app.get('/api/myController/*', function (req, res) {
        MyModel.findOne({
            url: req.params[0].toLowerCase()
        }).exec(function (err, model) {
            if (!model) {
                res.sendStatus(404);
                return;
            }

            res.send({
                imagePath: model.imagePath && model.imagePath !== '' ? model.imagePath : '/img/nophoto.jpg',
                title: model.title,
                description: model.description,
                date: model.date
            });
        });
    });

    app.post('/api/myController', auth.requiresApiLogin, upload.single('image'), function (req, res) {
        var image = req.file;

        var imagePath = image ? fileUpload.saveImage(image) : '';

        var model = req.body;

        MyModel.create({
            title: model.title,
            description: model.description,
            date: new Date(),
            imagePath: imagePath
        });
        res.sendStatus(201);
    });

    app.put('/api/myController/:id', auth.requiresApiLogin, upload.single('image'), function (req, res) {
        MyModel.findById(req.params.id, function (err, model) {
            if (req.body.deleteImage === 'true') {
                model.imagePath = '';
            } else {
                var image = req.file;
                model.imagePath = image ? fileUpload.saveImage(image) : model.imagePath;
            }

            var newModel = req.body;

            model.title = newModel.title;
            model.description = newModel.description;

            model.save(function (err) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    });

    app.delete('/api/myController/:id', auth.requiresApiLogin, function (req, res) {
        MyModel.remove({
            _id: req.params.id
        }).exec(function (err) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    });
};
