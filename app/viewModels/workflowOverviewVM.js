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

        $scope.addWorkflow = function addWorkflow() {
            $scope.workflows.push({
                name: 'New Workflow',
                calls: []
            });
        };

        $scope.confirmWorkflowDeletion = function confirmWorkflowDeletion(event, workflow) {
            var confirm = $mdDialog.confirm().
                title('Are you sure you want to remove this workflow [' + workflow.name + ']?').
                content('The workflow will be deleted, but the rest calls will remain.').
                ok('REMOVE WORKFLOW').
                cancel('KEEP WORKFLOW').
                targetEvent(event);
            $mdDialog.show(confirm).then($scope.removeWorkflowOnConfirm(workflow._id));
        };

        $scope.removeWorkflowOnConfirm = function removeWorkflowOnConfirm(workflowId) {
            return function removeWorkflowWrapper() {
                $scope.removeWorkflow(workflowId);
            };
        };

        $scope.removeWorkflow = function removeWorkflow(workflowId) {
            $http.delete('/api/workflows/' + workflowId).
                then($scope.removeWorkflowFromModel(workflowId));

        };

        $scope.removeWorkflowFromModel = function removeWOrkflowFromModel(workflowId) {
            return function removeWrapper() {
                for (var i = 0; i < $scope.workflows.length; i++) {
                    if ($scope.workflows[i]._id === workflowId) {
                        $scope.workflows.splice(i, 1);

                        break;
                    }
                }
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
