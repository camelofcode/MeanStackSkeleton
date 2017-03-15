/*jslint nomen: true, browser: true*/
/*global angular*/

angular.module('app').factory('galleryService', function ($resource) {
    'use strict';

    return $resource('/api/photoAlbum/:id', {
        id: '@_id'
    }, {
            update: {
                method: 'PUT',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            save: {
                method: 'POST',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        });
});
