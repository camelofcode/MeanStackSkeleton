/*global angular*/

angular.module('app').controller('mainController', function ($scope, loadingService, $sce, textPageService) {
    'use strict';

    loadingService.start();

    textPageService.get({ id: 'home' }, function (page) {
        $scope.text = $sce.trustAsHtml(page.text);
        loadingService.stop();
    });
});
