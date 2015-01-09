// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowVMScope(angular, undefined) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('workFlowVM', function workFlowVM($scope, workflowDAO, $mdDialog, events) {
        // Set a default empty workflow if not provided.
        $scope.originalWorkflow = $scope.originalWorkflow || {
            _id: null,
            calls: []
        };
        $scope.workflow = angular.copy($scope.originalWorkflow, {});

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

        $scope.retrievedWorkflow = function retrievedWorkflow(response) {
            $scope.workflow.name = response.name;
            $scope.workflow.calls = [];
            for (var i = 0; i < response.calls.length; i++) {
                $scope.workflow.calls.push({
                    _id: response.calls[i]
                });
            }
            $scope.$emit(events.WORKFLOW_RECEIVED, response);
        };

        $scope.getWorkflow = function getWorkflow() {
            workflowDAO.getWorkflow($scope.workflow._id)
                .then($scope.retrievedWorkflow);
        };

        // Ask the user for confirmation before removing
        $scope.confirmWorkflowDeletion = function confirmWorkflowDeletion(event) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to remove this workflow [' +
                    $scope.workflow.name + ']?')
                .content('The workflow will be deleted, but the rest calls will remain.')
                .ok('REMOVE WORKFLOW')
                .cancel('KEEP WORKFLOW')
                .targetEvent(event);
            $mdDialog.show(confirm).then($scope.removeWorkflowOnConfirm);
        };

        $scope.removeWorkflow = function removeWorkflow() {
            workflowDAO.removeWorkflow($scope.workflow._id)
                .then($scope.removeWorkflowFromModel);
        };

        $scope.removeWorkflowOnConfirm = function removeWorkflowOnConfirm() {
            if ($scope.workflow._id) {
                $scope.removeWorkflow();
            } else {
                $scope.removeWorkflowFromModel();
            }
        };

        $scope.removeWorkflowFromModel = function removeWorkflowFromModel() {
            $scope.$emit(events.WORKFLOW_DELETED, $scope.originalWorkflow);
            $scope.workflow = null;
        };

        $scope.executeWorkflow = function executeWorkflow() {
            workflowDAO.executeWorkflow($scope.workflow._id)
                .then($scope.workflowExecuted, $scope.workflowExecutionFailed);
        };

        $scope.workflowExecuted = function workflowExecuted(response) {
            $scope.workflow.success = true;
            $scope.$broadcast(events.EXECUTION_DONE, response);
        };

        $scope.workflowExecutionFailed = function workflowExecutionFailed(response) {
            $scope.workflow.success = false;
            $scope.$broadcast(events.EXECUTION_DONE, response);
        };
    });

}(window.angular));
