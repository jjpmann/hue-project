
var dash_button = require('node-dash-button');
var request = require('request');
var hueToggle = require('./index.js');
var dash = dash_button(["34:d2:70:f2:25:11", "84:d6:d0:f0:7a:23"], null, null, 'all'); //address from step above


dash.on("detected", function (dash_id){
    if (dash_id == '84:d6:d0:f0:7a:23') {
        console.log( 'Basement' );
        hueToggle.basement();
    }

    if (dash_id == '34:d2:70:f2:25:11') {
        console.log( 'Bedroom' );
        hueToggle.bedroom();
    }

});
