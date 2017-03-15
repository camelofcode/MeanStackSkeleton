/*global angular*/

angular.module('app').controller('contactController', function ($scope, loadingService, $sce, textPageService) {
    'use strict';

    loadingService.start();

    textPageService.get({ id: 'contact' }, function (page) {
        $scope.text = $sce.trustAsHtml(page.text);
        loadingService.stop();
    });
});
