'use strict';

require('es6-promise').polyfill();
Object.assign = require('object.assign');

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState,
    fs = require('fs'),
    obj = {};


var hueToggle = function(group){

    var hostname = '192.168.1.72',
        username = 'z9yJlDTpeasDDI-5iAxUi0a6loBVrIA3EMuQKao5',
        api,
        toggle = [
            lightState.create().on().bri(110),  // dim
            lightState.create().on().bri(200),  // on
            lightState.create().off()           // off
        ],
        current = 0,
        file = './group-' + group + '.toggle';


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
        api.setGroupLightState(group, state, function(err, lights){
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

obj.bedroom = function(){ hueToggle(2) };
obj.basement = function(){ hueToggle(1) };

module.exports = obj;