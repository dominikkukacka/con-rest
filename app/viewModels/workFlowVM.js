// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowVMScope(angular, undefined) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('workFlowVM', function workFlowVM($scope, $http, events) {
        // Set a default empty workflow if not provided.
        $scope.workflow = $scope.workflow || {
            _id: null,
            calls: []
        };

        // New calls created while configuring the workflow.
        $scope.newCalls = [];

        $scope.editing = false;

        $scope.startEditing = function startEditing() {
            $scope.editing = true;
        };

        // Add an additional REST call to the workflow.
        $scope.addCall = function addCall() {
            $scope.workflow.calls.push({});
        };

        $scope.retrievedWorkflow = function retrievedWorkflow(response) {
            $scope.workflow.name = response.data.name;
            $scope.workflow.calls = [];
            for (var i = 0; i < response.data.calls.length; i++) {
                $scope.workflow.calls.push({
                    _id: response.data.calls[i]
                });
            }
            $scope.$emit(events.WORKFLOW_RECEIVED, response);
        };

        $scope.getWorkflow = function getWorkflow() {
            $http.get('/api/workflows/' + $scope.workflow._id).
                then($scope.retrievedWorkflow);
        };

        $scope.createdWorkflow = function createdWorkflow(response) {
            $scope.workflow._id = response.data;
            $scope.$emit(events.WORKFLOW_CREATED, response);
        };

        $scope.extractCalls = function extractCalls() {
            var calls = [];
            for (var i = 0; i < $scope.workflow.calls.length; i++) {
                var id = $scope.workflow.calls[i]._id;
                if (id !== undefined) {
                    calls.push(id);
                }
            }
            return calls;
        };

        // The workflow we create only needs the id of the calls.
        $scope.createNewWorkflow = function createNewWorkflow() {
            var calls = $scope.extractCalls();
            $http.post('/api/workflows/', {
                name: $scope.workflow.name,
                calls: calls
            }).then($scope.createdWorkflow);
        };

        // The workflow can't be updated at this moment, will be implemented in the near future.
        $scope.workflowUpdated = function workflowUpdated(response) {
            $scope.$emit(events.WORKFLOW_UPDATED, response);
        };

        // The workflow can't be updated at this moment, will be implemented in the near future.
        $scope.updateWorkflow = function updateWorkflow() {
            var calls = $scope.extractCalls();
            $http.put('/api/workflows/' + $scope.workflow._id, {
                name: $scope.workflow.name,
                calls: calls
            }).then($scope.workflowUpdated);
        };

        // Saving would result in a POST for new workflows, but a PUT for an existing workflows.
        $scope.save = function save() {
            if (!$scope.workflow._id) {
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
