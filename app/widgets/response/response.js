/**
 * Created by Stefan Schacherl on 17.12.2014.
 */
(function response(angular, undefined) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('response', function responseDirective(events) {
        return {
            controller: 'responseVM',
            restrict: 'E',
            scope: {
                id: '@id',
                response: '=?response'
            },
            templateUrl: 'response',
            link: function responseConstructor(scope) {
                scope.$on(events.EXECUTION_DONE, scope.showResponse);
            }
        };
    });
}(window.angular));
