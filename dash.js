
var dash_button = require('node-dash-button');
var request = require('request');
var hue = require('./index.js');
var dash = dash_button("34:d2:70:f2:25:11", null, null, 'all'); //address from step above

dash.on("detected", function (){
    hue.bedroomToggle()
});
