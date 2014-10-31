// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(express, bodyParser) {
    'use strict';

    var app = express();

    app.use(bodyParser.json());

    app.get('something', function fakeCall() {

    });

    module.exports = app;

}(require('express'), require('body-parser')));