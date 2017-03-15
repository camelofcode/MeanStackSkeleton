/*jslint nomen: true*/
/*global angular, $ */
angular.module('app').requires.push('ngFileUpload');
angular.module('app').controller('galleryController', function ($scope, $sce, galleryService, notificationService, loadingService, Upload) {
    'use strict';

    function getAlbums() {
        loadingService.start();
        $scope.albums = galleryService.query({}, function () {
            loadingService.stop();
        });
    }

    getAlbums();

    $scope.clearSelected = function () {
        $scope.addForm.$setPristine();
        $scope.selected = {
            photos: [],
            removedPhotos: []
        };
    };

    $scope.selectItem = function (album) {
        $scope.selected = album;
        $scope.selected.removedPhotos = [];
    };

    $scope.add = function () {
        if ($scope.addForm.$invalid) {
            return;
        }

        var title = $scope.selected.title;
        var data = JSON.stringify($scope.selected);

        galleryService.save({}, data, function () {
            notificationService.success(title + ' Added');
            getAlbums();
            $('#add-modal').modal('hide');
            document.getElementById('add-form').reset();

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };

    $scope.edit = function () {
        if ($scope.editForm.$invalid) {
            return;
        }

        var title = $scope.selected.title;
        var data = JSON.stringify($scope.selected);

        galleryService.update({
            id: $scope.selected._id
        }, data, function () {
            notificationService.success(title + ' Edited');
            getAlbums();
            $('#edit-modal').modal('hide');
        }, function () {
            notificationService.error('Something went wrong :(');
        });
    }

    $scope.remove = function () {
        var title = $scope.selected.title;
        $scope.selected.$remove(function () {
            notificationService.success(title + ' Deleted');
            getAlbums();
            $('#delete-modal').modal('hide');

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };

    $scope.removePhoto = function (photo) {
        $scope.selected.removedPhotos.push(photo);
        var index = $scope.selected.photos.indexOf(photo);
        if (index > -1) {
            $scope.selected.photos.splice(index, 1);
        }
    }

    $scope.uploadFiles = function (files) {
        $scope.uploading = true;
        $scope.uploads = [];
        var completed = 0;
        if (files && files.length) {
            for (var i = 0; i < files.length; i += 1) {
                $scope.uploads.push({
                    name: files[i].name,
                    progress: 0
                });

                Upload.upload({
                    url: '/api/imageUpload',
                    arrayKey: '',
                    data: { image: files[i] }
                }).then(function (response) {
                    $scope.selected.photos.push({
                        imagePath: response.data,
                        caption: null
                    });
                    completed += 1;
                    if (completed === files.length) {
                        $('#image-upload-modal').modal('hide');
                        $scope.uploading = false;
                        $scope.uploads = [];
                    }
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

                        for (var j = 0; j < $scope.uploads.length; j += 1) {
                            if ($scope.uploads[j].name === evt.config.data.image.name) {
                                $scope.uploads[j].progress = progressPercentage;
                            }
                        }
                });
            }
        }
    }
});
