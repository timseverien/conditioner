/**
 * Tests if the window dimensions match certain expectations
 * @module monitors/custom
 */
(function(undefined) {

    'use strict';

    var _shared = {
        triggered:false
    };

    var exports = {
        trigger:function(bubble){
            if (!_shared.triggered) {
                _shared.triggered = true;
            }
            setTimeout(function(){
                bubble();
            },500);
        },
        parse:function(expected){
            return [{
                'value':expected.split(',')
            }]
        },
        test:function(data) {
            return data.expected === 'true';
        }
    };

    // CommonJS
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = exports;
    }
    // AMD
    else if (typeof define === 'function' && define.amd) {
        define(function(){return exports;});
    }

}());