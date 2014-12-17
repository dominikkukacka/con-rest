/**
 * Created by Stefan Schacherl on 17.12.2014.
 */

(function responseVMScope(angular){
    'use strict';

    var app = angular.module('con-rest');

    app.controller('responseVM', function responseVM($scope/*, events, $timeout*/) {
        $scope.response = null;


        $scope.showResponse = function showResponse(response) {
            $scope.response = response;
        };
    });

}(window.angular));
