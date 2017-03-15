/*jslint node: true*/
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: '{PATH} is required!'
    },
    hashedPassword: {
        type: String,
        required: '{PATH} is required!'
    }
});

mongoose.model('User', userSchema);
