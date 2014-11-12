// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowOverviewVM(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('workflowOverviewVM', function workflowOverviewVM($scope, $http, events) {
        $scope.workflows = [];

        $scope.workflowsRetrieved = function workflowsRetrieved(response) {
            $scope.workflows = response.data;
            $scope.$emit(events.WORKFLOWS_RETRIEVED, response);
        };

        $scope.getWorkflows = function getWorkflows() {
            $http.get('/api/workflows/').
                then($scope.workflowsRetrieved);
        };
    });
}(window.angular));