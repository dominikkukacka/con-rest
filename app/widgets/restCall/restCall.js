// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCall(angular, undefined) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('restCall', function restCallDirective() {
        return {
            controller: 'restCallVM',
            restrict: 'E',
            scope: {
                id: '@id',
                request: '=?restCall'
            },
            templateUrl: 'restCall',
            link: function restCallConstructor(scope) {
                if (scope.id) {
                    scope.getCall();
                }
            }
        };
    });
}(window.angular));
