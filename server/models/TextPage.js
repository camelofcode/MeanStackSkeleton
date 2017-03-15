/*jslint node: true*/
var mongoose = require('mongoose');

var textPageSchema = mongoose.Schema({
    pageId: {
        type: String,
        required: '{PATH} is required!'
    },
    text: {
        type: String,
        required: '{PATH} is required!'
    }
});

mongoose.model('TextPage', textPageSchema);
