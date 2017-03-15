/*global angular*/

angular.module('app').controller('thingController', function ($scope, loadingService, $sce, thingService, $routeParams) {
    'use strict';

    function setHeights() {
        $('.retreat-well').matchHeight({
            byRow: true
        });
        $('.retreat-location').matchHeight({
            byRow: true
        });
        $('.retreat-button').matchHeight({
            byRow: true
        });
    }

    $scope.getTrusted = function (item) {
        return $sce.trustAsHtml(item);
    };

    loadingService.start();

    if ($routeParams.id) {
        thingService.get({
            id: $routeParams.id
        }, function (article) {
            $scope.data = article;
            loadingService.stop();
        }, function(result) {
            if (result.status === 404) {
                window.location.href = '/404';
            } else {
                window.location.href = '/500';
            }
        });
    } else {
        $scope.items = thingService.query({}, function () {
            loadingService.stop(function () {
                setTimeout(function () {
                    setHeights();
                }, 0);
            });
        });
    }

    $(window).resize(function () {
        setHeights();
    });
});
