/*global angular*/

angular.module('app', ['ngResource', 'ngRoute', 'ngCookies']);
angular.module('app').config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    'use strict';

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mainController'
        }).when('/things', {
            templateUrl: '/partials/things/things',
            controller: 'thingController',
            caseInsensitiveMatch: true
        }).when('/things/:id', {
            templateUrl: '/partials/things/thing',
            controller: 'thingController',
            caseInsensitiveMatch: true
        }).when('/gallery', {
            templateUrl: '/partials/gallery/gallery',
            controller: 'galleryController',
            caseInsensitiveMatch: true
        }).when('/gallery/:id', {
            templateUrl: '/partials/gallery/album',
            controller: 'galleryController',
            caseInsensitiveMatch: true
        }).when('/contact', {
            templateUrl: '/partials/contact/contact',
            controller: 'contactController',
            caseInsensitiveMatch: true
        }).when('/404', {
            templateUrl: '/partials/errors/404',
            controller: 'errorController',
            caseInsensitiveMatch: true
        }).when('/500', {
            templateUrl: '/partials/errors/500',
            controller: 'errorController',
            caseInsensitiveMatch: true
        }).otherwise({
            redirectTo: '/'
        });
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
});
