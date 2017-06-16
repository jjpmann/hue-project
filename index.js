'use strict';

require('es6-promise').polyfill();

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState,
    fs = require('fs');
 
module.exports.bedroomToggle = function(){

    var hostname = "192.168.1.72",
        username = "z9yJlDTpeasDDI-5iAxUi0a6loBVrIA3EMuQKao5",
        api,
        toggle = [
            lightState.create().on().bri(110),  // dim
            lightState.create().on().bri(200),  // on
            lightState.create().off()           // off
        ],
        current = 0,
        file = './master.toggle';


    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        
        current = parseInt(data) || 0;
        current++;
        current = current+1 > toggle.length ? 0 : current;
        // console.log( current, );

        toggleGroup(toggle[current])
    });

    function toggleGroup(state){
        api = new HueApi(hostname, username);
        api.setGroupLightState(2, state, function(err, lights){
            if (err) {
                return console.log(err);
            }
            writeCurrent();
        })
    }

    function writeCurrent(){
        // console.log( current );
        fs.writeFile(file, current, function(err) {
            if (err) {
                return console.log(err);
            }
        }); 
    }

}