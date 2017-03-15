/*jslint nomen: true*/
/*global angular*/

angular.module('app').factory('textPageService', function ($resource) {
    'use strict';

    var TextPageResource = $resource('/api/textPage/:id', {
        pageId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    return TextPageResource;
});
