(function mapperRegistratorDirectiveScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('mapperRegistrator', function mapperRegistratorDirective() {
        return {
            restrict: 'E',
            scope: {},
            controller: 'mapperC',
            templateUrl: 'mapperRegistrator'
        };
    });
}(window.angular));
