// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowVMScope(angular, undefined) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('workFlowVM', function workFlowVM($scope, $http, events) {
        $scope.id = null;
        $scope.name = null;
        $scope.calls = [
            {}
        ];
        $scope.newCalls = [];

        $scope.addCall = function addCall() {
            $scope.calls.push({});
        };

        $scope.retrievedWorkflow = function retrievedWorkflow(response) {
            $scope.name = response.data.name;
            $scope.calls = response.data.calls;
            $scope.$emit(events.WORKFLOW_RECEIVED, response);
        };

        $scope.getWorkflow = function getWorkflow() {
            $http.get('/api/workflows/' + $scope.id).
                then($scope.retrievedWorkflow);
        };

        $scope.createdWorkflow = function createdWorkflow(response) {
            $scope.id = response.data;
            $scope.$emit(events.WORKFLOW_CREATED, response);
        };

        $scope.createNewWorkflow = function createNewWorkflow() {
            var calls = [];
            for (var i = 0; i < $scope.calls.length; i++) {
                var id = $scope.calls[i]._id;
                if (id !== undefined) {
                    calls.push(id);
                }
            }
            $http.post('/api/workflows/', {
                name: $scope.name,
                calls: calls
            }).then($scope.createdWorkflow);
        };

        $scope.workflowUpdated = function workflowUpdated(response) {
            $scope.$emit(events.WORKFLOW_UPDATED, response);
        };

        $scope.updateWorkflow = function updateWorkflow() {
            $http.put('/api/workflows/' + $scope.id, {
                name: $scope.name,
                calls: $scope.calls
            }).then($scope.workflowUpdated);
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
