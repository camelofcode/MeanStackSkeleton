/*global angular, toastr*/

angular.module('app').factory('notificationService', function () {
    'use strict';

    toastr.options = {
        "debug": false,
        "positionClass": 'toast-bottom-right',
        "onclick": null,
        "fadeIn": 300,
        "fadeOut": 500,
        "timeOut": 2000,
        "extendedTimeOut": 1000
    };

    return {
        success: function (msg, options) {
            toastr.success(msg);
        },
        error: function (msg, options) {
            toastr.error(msg);
        }
    };
});
