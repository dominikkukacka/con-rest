/**
 * Created by Stefan Schacherl on 17.12.2014.
 */

(function responseVMScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('responseVM', function responseVM($scope) {
        $scope.response = $scope.response || null;

        $scope.showResponse = function showResponse(event, response) {
            $scope.response = response;
        };
    });
}(window.angular));
