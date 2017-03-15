/*global angular*/

angular.module('app').controller('errorController', function ($scope, loadingService) {
    'use strict';

    loadingService.start();
    loadingService.stop();
});
