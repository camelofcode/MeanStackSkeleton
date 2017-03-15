/*global angular*/

angular.module('app').requires.push('ui.tinymce');
angular.module('app').requires.push('ngSanitize');
angular.module('app').controller('mainController', function ($scope, $sce, notificationService, textPageService, loadingService, imageUploadPlugin, styleButtonsPlugin) {
    'use strict';

    loadingService.start();

    textPageService.get({
        id: 'home'
    }, function (page) {
        $scope.homeText = page.text;
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

    $scope.editingHomeText = false;
    $scope.originalHomeText = '';

    $scope.editHomeText = function () {
        $scope.editingHomeText = true;
        $scope.originalHomeText = $scope.homeText;
    };

    $scope.cancelEditHomeText = function () {
        $scope.homeText = $scope.originalHomeText;
        $scope.editingHomeText = false;
    };

    $scope.saveHomeText = function () {
        textPageService.update({
            id: 'home'
        },  {
            text: $scope.homeText
        }, function () {
            notificationService.success('Home Text Updated');
            $scope.editingHomeText = false;

        }, function () {
            notificationService.error('Something went wrong :(');
        });
    };
});
