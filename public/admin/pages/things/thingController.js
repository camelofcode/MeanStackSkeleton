/*jslint nomen: true*/
/*global angular, $, FormData */

angular.module('app').requires.push('ui.tinymce');
angular.module('app').requires.push('ngSanitize');
angular.module('app').controller('thingController', function ($scope, $sce, thingService, notificationService, loadingService) {
    'use strict';

    function getThings() {
        loadingService.start();
        $scope.things = thingService.query({}, function () {
            loadingService.stop();
        });
    }

    getThings();

    $scope.formData = {};

    $scope.clearSelected = function () {
        $scope.addForm.$setPristine();
        $scope.formData = {};
    };

    $scope.selectItem = function (thing) {
        $scope.selected = thing;

        $scope.selected.changingImage = false;
        $scope.selected.deleteImage = false;
        $scope.formData.image = undefined;

        $scope.formData._id = thing._id;
        $scope.formData.title = thing.title;
        $scope.formData.description = thing.description;
    };

    $scope.add = function () {
        if ($scope.addForm.$invalid) {
            return;
        }

        var title = $scope.formData.title;

        var data = new FormData();
        angular.forEach($scope.formData, function (value, key) {
            data.append(key, value);
        });

        thingService.save({}, data, function () {
            notificationService.success(title + ' Added');
            getThings();
            $('#add-modal').modal('hide');
            document.getElementById('add-form').reset();

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };

    $scope.edit = function() {
        if ($scope.editForm.$invalid) {
            return;
        }

        var data = new FormData();
        angular.forEach($scope.formData, function (value, key) {
            data.append(key, value);
        });

        data.append('deleteImage', $scope.selected.deleteImage);

        var title = $scope.selected.title;

        thingService.update({
            id: $scope.selected._id
        }, data, function () {
            document.getElementById('edit-image-upload').value = null;
            notificationService.success(title + ' Edited');
            getThings();
            $('#edit-modal').modal('hide');
        }, function () {
            notificationService.error('Something went wrong :(');
        });
    }

    $scope.remove = function () {
        var location = $scope.selected.location;
        $scope.selected.$remove(function () {
            notificationService.success(location + ' Deleted');
            getThings();
            $('#delete-modal').modal('hide');

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };
});
