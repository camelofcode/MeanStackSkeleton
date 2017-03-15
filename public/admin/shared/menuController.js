/*global angular*/

angular.module('app').controller('menuController', function ($scope, $location) {
    'use strict';

    $scope.getClass = function (path) {
        if (path.toLowerCase() === 'admin') {
            if ($location.path().toLowerCase() === '/admin') {
                return 'btn-primary';
            } else {
                return '';
            }
        } else {
            var parts = $location.path().split('/');
            if (parts.length === 3 && parts[2].toLowerCase() === path.toLowerCase()) {
                return 'btn-primary';
            } else {
                return '';
            }
        }
    };
});
