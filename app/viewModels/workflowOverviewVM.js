// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowOverviewVM(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('workflowOverviewVM', function workflowOverviewVM($scope, $http, $mdDialog, events) {
        $scope.workflows = [];
        $scope.response = null;

        $scope.addWorkflow = function addWorkflow() {
            $scope.workflows.push({
                name: 'New Workflow',
                calls: []
            });
        };

        $scope.removedWorkflow = function removedWorkflow(event, workflow) {
            event.stopPropagation();
            var index = $scope.workflows.indexOf(workflow);
            $scope.workflows.splice(index, 1);
        };

        $scope.confirmWorkflowDeletion = function confirmWorkflowDeletion(event, workflow) {
            var confirm = $mdDialog.confirm().
            title('Are you sure you want to remove this workflow [' + workflow.name + ']?').
            content('The workflow will be deleted, but the rest calls will remain.').
            ok('REMOVE WORKFLOW').
            cancel('KEEP WORKFLOW').
            targetEvent(event);
            $mdDialog.show(confirm).then($scope.removeWorkflowOnConfirm(workflow));
        };

        $scope.removeWorkflowOnConfirm = function removeWorkflowOnConfirm(workflow) {
            return function removeWorkflowWrapper() {
                if (workflow._id) {
                    $scope.removeWorkflow(workflow);
                } else {
                    // removeWorkflowFromModel returns a wrapped function.
                    $scope.removeWorkflowFromModel(workflow)();
                }
            };
        };

        $scope.removeWorkflow = function removeWorkflow(workflow) {
            $http.delete('/api/workflows/' + workflow._id).
            then($scope.removeWorkflowFromModel(workflow));
        };

        $scope.removeWorkflowFromModel = function removeWorkflowFromModel(workflow) {
            return function removeWrapper() {
                var index = $scope.workflows.indexOf(workflow);
                $scope.workflows.splice(index, 1);
            };
        };

        $scope.convertCallsToModel = function convertCallsToModel(workflows) {
            angular.forEach(workflows, function iterator(workflow) {
                var convertedCalls = [];
                angular.forEach(workflow.calls, function iterator(call) {
                    this.push({
                        _id: call
                    });
                }, convertedCalls);
                workflow.calls = convertedCalls;
            });
            return workflows;
        };

        $scope.workflowsRetrieved = function workflowsRetrieved(response) {
            $scope.workflows = $scope.convertCallsToModel(response.data);

            $scope.$emit(events.WORKFLOWS_RETRIEVED, response);
        };

        $scope.getWorkflows = function getWorkflows() {
            $http.get('/api/workflows/').
            then($scope.workflowsRetrieved);
        };
    });
}(window.angular));
