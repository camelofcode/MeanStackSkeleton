/*jslint nomen: true, browser: true, vars: true, es5: true*/
/*global angular, $, FormData, tinymce*/

angular.module('app').factory('imageUploadPlugin', function (notificationService, $http) {
    'use strict';

    var uploading = false;

    function showUploadingUI() {
        uploading = true;
        $('#tinymce-image-upload-form').hide();
        $('#tinymce-image-upload-uploading').show();
    }

    function hideUploadingUI() {
        uploading = false;
        $('#tinymce-image-upload-form').show();
        $('#tinymce-image-upload-uploading').hide();
    }

    tinymce.PluginManager.add('imageUpload', function (editor, url) {
        editor.addButton('imageUpload', {
            icon: 'image',
            tooltip: 'Upload Image',
            onclick: function () {
                $('#tinymce-image-upload-uploading').hide();
                $('#tinymce-image-upload-form').off('submit');
                $('#tinymce-image-upload').modal('show');

                $('#tinymce-image-upload').off('hide.bs.modal');
                $('#tinymce-image-upload').off('hidden.bs.modal');
                $('#tinymce-image-upload').on('hide.bs.modal', function (e) {
                    if (uploading) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        return false;
                    }
                });
                $('#tinymce-image-upload').on('hidden.bs.modal', function (e) {
                    document.getElementById('tinymce-image-upload-file').value = null;
                    hideUploadingUI();
                });

                $('#tinymce-image-upload-form').submit(function () {
                    var data = new FormData();
                    data.append('image', document.getElementById('tinymce-image-upload-file').files[0]);
                    showUploadingUI();

                    $http.post('/api/imageUpload', data, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }).then(function (response) {
                        var img = '<img src="' + response.data + '" width="100%">';
                        editor.insertContent(img);
                        uploading = false;
                        $('#tinymce-image-upload').modal('hide');
                        document.getElementById('tinymce-image-upload-file').value = null;
                    }).catch(function () {
                        notificationService.error('Something went wrong :(');
                        hideUploadingUI();
                    });

                });
            }
        });
    });

    return {};
});
