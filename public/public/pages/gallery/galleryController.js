/*global angular*/

angular.module('app').controller('galleryController', function ($scope, loadingService, $sce, galleryService, $routeParams) {
    'use strict';

    function setHeights() {
        $('.album-well').matchHeight({
            byRow: true
        });
        $('.album-title').matchHeight({
            byRow: true
        });
        $('.album-description').matchHeight({
            byRow: true
        });
        $('.album-button').matchHeight({
            byRow: true
        });
        $('.photo-well').matchHeight({
            byRow: true
        });
        $('.photo-caption').matchHeight({
            byRow: true
        });
    }

    loadingService.start();

    if ($routeParams.id) {
        galleryService.get({
            id: $routeParams.id
        }, function (article) {
            $scope.data = article;
            loadingService.stop(function () {
                setTimeout(function () {
                    setHeights();
                }, 0);
            });
        }, function (result) {
            if (result.status === 404) {
                window.location.href = '/404';
            } else {
                window.location.href = '/500';
            }
        });
    } else {
        $scope.items = galleryService.query({}, function () {
            loadingService.stop(function () {
                setTimeout(function () {
                    setHeights();
                }, 0);
            });
        });
    }

    $scope.index = 0;

    $scope.viewPhoto = function (index) {
        $scope.index = index;
        $scope.selectedPhoto = $scope.data.photos[$scope.index];

        $('.photo-box').fadeIn();
    }

    $('.photo-box').on('click',
        function () {
            $('.photo-box').fadeOut();
        });

    $scope.swipeLeft = function () {
        $scope.index += 1;
        if ($scope.index === $scope.data.photos.length) {
            $scope.index = 0;
        }
        $scope.selectedPhoto = $scope.data.photos[$scope.index];
    };

    $scope.swipeRight = function () {
        $scope.index -= 1;
        if ($scope.index < 0) {
            $scope.index = $scope.data.photos.length - 1;
        }
        $scope.selectedPhoto = $scope.data.photos[$scope.index];
    };

    $(window).resize(function () {
        setHeights();
    });
});
