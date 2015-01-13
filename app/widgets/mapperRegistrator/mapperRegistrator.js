(function mapperRegistratorDirectiveScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('mapperRegistrator', function mapperRegistratorDirective() {
        return {
            restrict: 'E',
            scope: {},
            controller: 'mapperC',
            templateUrl: 'mapperRegistrator',
            link: function mapperRegistratorConstructor(scope) {
                // Add a default map on initialization.
                scope.addMap();
            }
        };
    });
}(window.angular));
