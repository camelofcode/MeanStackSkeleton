/*global angular*/

angular.module('app').requires.push('ui.tinymce');
angular.module('app').requires.push('ngSanitize');
angular.module('app').controller('contactController', function ($scope, $sce, notificationService, textPageService, loadingService, imageUploadPlugin, styleButtonsPlugin) {
    'use strict';

    loadingService.start();

    textPageService.get({
        id: 'contact'
    }, function (page) {
        $scope.contactText = page.text;
        loadingService.stop();
    });

    $scope.getTrusted = function (item) {
        return $sce.trustAsHtml(item);
    };

    $scope.tinymceOptions = {
        plugins: 'link imageUpload styleButtons',
        toolbar: 'bold italic | style-p style-h1 style-h2 style-h3 style-h4 style-h5 style-h6 | alignleft aligncenter alignright | link imageUpload',
        menubar: '',
        relative_urls: false,
        min_height: 300
    };

    $scope.editingContactText = false;
    $scope.originalContactText = '';

    $scope.editContactText = function () {
        $scope.editingContactText = true;
        $scope.originalContactText = $scope.contactText;
    };

    $scope.cancelEditContactText = function () {
        $scope.contactText = $scope.originalContactText;
        $scope.editingContactText = false;
    };

    $scope.saveContactText = function () {
        textPageService.update({
            id: 'contact'
        }, {
            text: $scope.contactText
        }, function () {
            notificationService.success('Contact Text Updated');
            $scope.editingContactText = false;

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };
});
