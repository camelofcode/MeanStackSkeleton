/*global angular*/

angular.module('app').controller('menuController', function ($scope, $location) {
    'use strict';

    $scope.getClass = function (path) {
        if ('/' + $location.path().split('/')[1].toLowerCase() === path.toLowerCase()) {
            return 'active';
        } else {
            return '';
        }
    };
});
