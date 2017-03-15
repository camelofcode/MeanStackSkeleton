/*global $*/
//Fix shitty bootstrap bug
$(document).on('hidden.bs.modal', function () {
    'use strict';

    if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
    }
});
