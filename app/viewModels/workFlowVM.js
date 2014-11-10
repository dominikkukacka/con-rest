// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowVMScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('workFlowVM', function workFlowVM($scope, $http, events) {
        $scope.id = null;
        $scope.name = null;
        $scope.calls = null;
        $scope.availableCalls = null;
        $scope.newCalls = [];

        $scope.retrievedWorkflow = function retrievedWorkflow(response) {
            $scope.name = response.data.name;
            $scope.calls = response.data.calls;
            $scope.$emit(events.WORKFLOW_RECEIVED, response);
        };

        $scope.getWorkflow = function getWorkflow() {
            $http.get('/api/workflow/' + $scope.id).
                then($scope.retrievedWorkflow);
        };

        $scope.createdWorkflow = function createdWorkflow(response) {
            $scope.id = response.data;
            $scope.$emit(events.WORKFLOW_CREATED, response);
        };

        $scope.createNewWorkflow = function createNewWorkflow() {
            $http.post('/api/workflow/', {
                name: $scope.name
            }).then($scope.createdWorkflow);
        };

        $scope.workflowUpdated = function workflowUpdated(response) {
            $scope.$emit(events.WORKFLOW_UPDATED, response);
        };

        $scope.updateWorkflow = function updateWorkflow() {
            $http.put('/api/workflow/' + $scope.id, {
                name: $scope.name,
                calls: $scope.calls
            }).then($scope.workflowUpdated);
        };

        $scope.retrievedRequests = function retrievedRequests(response) {
            $scope.availableCalls = response.data;
            $scope.$emit(events.REQUESTS_RETRIEVED, response);
        };

        $scope.getAvailableRequests = function getAvailableRequests() {
            $http.get('/api/requests/').
                then($scope.retrievedRequests);
        };

        $scope.save = function save() {
            if ($scope.id === null) {
                $scope.createNewWorkflow();
            } else {
                $scope.updateWorkflow();
            }
        };

        $scope.addRestCall = function addRestCall() {
            $scope.newCalls.push({});
        };
    });

}(window.angular));
