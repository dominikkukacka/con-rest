// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function callRegistratorScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('callRegistrator', function callRegistratorDirective() {
        return {
            controller: 'restCallC',
            restrict: 'EA',
            scope: {
                request: '=?restCall'
            },
            templateUrl: 'callRegistrator'
        };
    });
}(window.angular));
