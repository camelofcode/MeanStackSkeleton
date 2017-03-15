/*jslint nomen: true*/
/*global angular*/

angular.module('app').factory('userService', function ($resource) {
    'use strict';

    var UserResource = $resource('/api/user/:id', {
        id: '@_id'
    }, {
            update: {
                method: 'PUT'
            }
        });

    return UserResource;
});
