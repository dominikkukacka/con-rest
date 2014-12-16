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
        $scope.originalWorkflow = $scope.originalWorkflow || {
            _id: null,
            calls: []
        };
        $scope.workflow = angular.copy($scope.originalWorkflow, {});

        // New calls created while configuring the workflow.
        $scope.newCalls = [];

        $scope.editing = false;

        $scope.startEditing = function startEditing() {
            $scope.editing = true;
        };

        $scope.endEditing = function endEditing() {
            $scope.editing = false;
            if (!$scope.workflow._id) {
                $scope.$emit(events.WORKFLOW_DELETED, $scope.workflow);
            }
        };

        $scope.requestCancel = function requestCancel() {
            $scope.$emit(events.CANCEL_EDITING);
        };

        // Add an additional REST call to the workflow.
        $scope.addCall = function addCall() {
            $scope.workflow.calls.push({});
        };

        // Remove a REST call which was added to the workflow.
        $scope.removeCall = function removeCall(index) {
            $scope.workflow.calls.splice(index, 1);
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
            var promise = $http.post('/api/workflows/', {
                name: $scope.workflow.name,
                calls: calls
            });
            promise.then($scope.createdWorkflow);
            return promise;
        };

        // The workflow can't be updated at this moment, will be implemented in the near future.
        $scope.workflowUpdated = function workflowUpdated(response) {
            $scope.$emit(events.WORKFLOW_UPDATED, response);
        };

        // The workflow can't be updated at this moment, will be implemented in the near future.
        $scope.updateWorkflow = function updateWorkflow() {
            var calls = $scope.extractCalls();
            var promise = $http.put('/api/workflows/' + $scope.workflow._id, {
                _id: $scope.workflow._id,
                name: $scope.workflow.name,
                calls: calls
            });
            promise.then($scope.workflowUpdated);
            return promise;
        };

        // Saving would result in a POST for new workflows, but a PUT for an existing workflows.
        $scope.save = function save() {
            var promise;
            if (!$scope.workflow._id) {
                promise = $scope.createNewWorkflow();
            } else {
                promise = $scope.updateWorkflow();
            }
            promise.then($scope.updateModel);
        };

        $scope.updateModel = function updateModel() {
            $scope.originalWorkflow.name = $scope.workflow.name;
            $scope.originalWorkflow.calls = $scope.workflow.calls;
        };

        $scope.addRestCall = function addRestCall() {
            $scope.newCalls.push({});
        };
    });

}(window.angular));
