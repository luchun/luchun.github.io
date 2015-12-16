// js/app.js

var app = app || {};
var ENTER_KEY = 13;

$(function() {

    // Kick things off by creating the **App**.
    new app.AppView();

});
var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});
