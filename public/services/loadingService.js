/*global angular*/

angular.module('app').factory('loadingService', function ($rootScope, $timeout) {
    'use strict';

    return {
        start: function () {
            $rootScope.loaded = false;
        },
        stop: function (callback) {
            $timeout(function () {
                $rootScope.loaded = true;
                callback && callback();
            }, 100);
        }
    };
});
