// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest

// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function callSelectorScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('callSelector', function callSelectorDirective() {
        return {
            controller: 'restCallVM',
            restrict: 'E',
            scope: {
                call: '=call'
            },
            templateUrl: 'callSelector',
            link: function constructor(scope) {
                // Retrieve the available requests.
                scope.getAvailableRequests();
            }
        };
    });
}(window.angular));
