/*global angular*/

angular.module('app').factory('sidebarService', function ($resource) {
    'use strict';

    return  $resource('/api/sidebar', {});
});
