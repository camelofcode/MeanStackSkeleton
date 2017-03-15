/*jslint nomen: true*/
/*global angular, $, FormData */

angular.module('app').controller('userController', function ($scope, $sce, userService, notificationService, loadingService) {
    'use strict';

    function getUsers() {
        loadingService.start();
        $scope.users = userService.query({}, function() {
            loadingService.stop();
        });
    }

    getUsers();

    $scope.clearSelected = function () {
        $scope.addForm.$setPristine();
        $scope.selected = {
            username: '',
            password: '',
            confirmedPassword: ''
        };
    };

    $scope.selectItem = function (user) {
        $scope.selected = user;
    };

    $scope.addUser = function () {
        if ($scope.addForm.$invalid || $scope.selected.confirmedPassword !== $scope.selected.password) {
            return;
        }

        userService.save({}, $scope.selected, function () {
            notificationService.success($scope.selected.username + ' Added');
            getUsers();
            $('#add-modal').modal('hide');
            document.getElementById('add-form').reset();

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };

    $scope.editUser = function () {
        if ($scope.editForm.$invalid || $scope.selected.confirmedPassword !== $scope.selected.password) {
            return;
        }
        var name = $scope.selected.username;
        $scope.selected.$update(function () {
            notificationService.success(name + ' Edited');
            getUsers();
            $('#edit-modal').modal('hide');


        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };

    $scope.removeUser = function () {
        var name = $scope.selected.username;
        $scope.selected.$remove(function () {
            notificationService.success(name + ' Deleted');
            getUsers();
            $('#delete-modal').modal('hide');

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };
});
