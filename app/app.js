// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function appScope(angular) {
    'use strict';

    // `con-rest` angular module registration - COMPLETE!
    var app = angular.module('con-rest', ['ngRoute', 'ngMaterial']);

    var sitemap = [
        {
            url: '/workflows',
            templateUrl: 'pages/workflows.html',
            label: 'workflows'
        },
        {
            url: '/registerCall',
            templateUrl: 'pages/registerCall.html',
            label: 'register call'
        }
    ];

    app.factory('sitemap', function siteMap() {
        return sitemap;
    });

    app.config(function appRouting($routeProvider) {
        for (var i = 0; i < sitemap.length; i++) {
            var page = sitemap[i];
            $routeProvider.when(page.url, {
                templateUrl: page.templateUrl
            });
        }

        $routeProvider.otherwise({
            redirectTo: '/workflows'
        });
    });
}(window.angular));