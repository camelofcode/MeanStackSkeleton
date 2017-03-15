/*jslint nomen: true, browser: true*/
/*global angular*/

angular.module('app').factory('thingService', function ($resource) {
    'use strict';

    var dateResource = $resource('/api/myController/:id', {
        id: '@_id'
    }, {
            update: {
                method: 'PUT',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            },
            save: {
                method: 'POST',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }
        });

    return dateResource;
});
