/*global angular*/

angular.module('app').controller('footerController', function ($scope) {
    'use strict';
    
    $scope.year = new Date().getFullYear();
});

