/*global angular*/

angular.module('app').controller('sidebarController', function ($scope, $location, sidebarService) {
    'use strict';

    $scope.items = sidebarService.query();

    $scope.viewThing = function(thing) {
        $location.path('/Things/' + thing.url);
    }
});
