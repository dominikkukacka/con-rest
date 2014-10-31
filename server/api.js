// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiScope() {
    'use strict';

    function registerAPICall(req, res) {
        res.send('abc');
    }

    exports.registerAPICall = registerAPICall;
}());