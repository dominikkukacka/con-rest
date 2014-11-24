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
            id: null,
            calls: []
        };

        // The properties of the workflow which are not yet persisted.
        $scope.name = null;
        $scope.calls = [
            {}
        ];

        // New calls created while configuring the workflow.
        $scope.newCalls = [];

        $scope.editing = false;

        $scope.startEditing = function startEditing() {
            $scope.editing = true;
        };

        // Add an additional REST call to the workflow.
        $scope.addCall = function addCall() {
            $scope.calls.push({});
        };

        $scope.retrievedWorkflow = function retrievedWorkflow(response) {
            $scope.name = response.data.name;
            $scope.calls = response.data.calls;
            $scope.$emit(events.WORKFLOW_RECEIVED, response);
        };

        $scope.getWorkflow = function getWorkflow() {
            $http.get('/api/workflows/' + $scope.workflow.id).
                then($scope.retrievedWorkflow);
        };

        $scope.createdWorkflow = function createdWorkflow(response) {
            $scope.workflow.id = response.data;
            $scope.workflow.name = $scope.name;
            $scope.workflow.calls = $scope.calls;
            $scope.$emit(events.WORKFLOW_CREATED, response);
        };

        // The workflow we create only needs the id of the calls.
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

        // The workflow can't be updated at this moment, will be implemented in the near future.
        $scope.workflowUpdated = function workflowUpdated(response) {
            $scope.$emit(events.WORKFLOW_UPDATED, response);
        };

        // The workflow can't be updated at this moment, will be implemented in the near future.
        $scope.updateWorkflow = function updateWorkflow() {
            $http.put('/api/workflows/' + $scope.workflow.id, {
                name: $scope.name,
                calls: $scope.calls
            }).then($scope.workflowUpdated);
        };

        // Saving would result in a POST for new workflows, but a PUT for an existing workflows.
        $scope.save = function save() {
            if ($scope.workflow.id === null) {
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
