// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function appScope(angular) {
    'use strict';

    // `con-rest` angular module registration - COMPLETE!
    var app = angular.module('con-rest', ['ngRoute', 'ngMaterial']);

    app.config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'pages/workflows.html'
            }).
            otherwise({
                redirectTo: '/'
            })
    });
}(window.angular));