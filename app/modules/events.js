// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function eventsScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.factory('events', function eventsFactory() {
        return {
            REGISTRATION_SUCCESSFUL: 'registrationSuccessful',
            REGISTRATION_FAILED: 'registrationFailed',
            REQUEST_FAILED: 'requestFailed',
            RESPONSE_RECEIVED: 'responseReceived'
        };
    });
}(window.angular));