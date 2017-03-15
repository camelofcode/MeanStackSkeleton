/*global angular*/

angular.module('app', ['ngResource', 'ngRoute', 'ngCookies']);
angular.module('app').config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    'use strict';

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/Admin', {
            templateUrl: '/admin/partials/main/main',
            controller: 'mainController'
        }).when('/Admin/Things', {
            templateUrl: '/admin/partials/things/things',
            controller: 'thingController',
            caseInsensitiveMatch: true
        }).when('/Admin/Gallery', {
            templateUrl: '/admin/partials/gallery/gallery',
            controller: 'galleryController',
            caseInsensitiveMatch: true
        }).when('/Admin/Contact', {
            templateUrl: '/admin/partials/contact/contact',
            controller: 'contactController',
            caseInsensitiveMatch: true
        }).when('/Admin/Users', {
            templateUrl: '/admin/partials/user/user',
            controller: 'userController',
            caseInsensitiveMatch: true
        }).otherwise({
            redirectTo: '/Admin'
        });
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
});
