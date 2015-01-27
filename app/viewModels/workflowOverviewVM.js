// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowOverviewVM(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('workflowOverviewVM', function workflowOverviewVM($scope, workflowDAO, $mdDialog, events) {
    $scope.workflows = [];
    $scope.response = null;

    $scope.workflow = null;

    $scope.showWorkflowDetails = function showWorkflowDetails(event, requestedWorkflow) {
      event.stopPropagation();
      $scope.showDetails = !$scope.showDetails;
      $scope.workflow = requestedWorkflow;
    };

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
      $scope.workflows = $scope.convertCallsToModel(response);

      $scope.$emit(events.WORKFLOWS_RETRIEVED, response);
    };

    $scope.getWorkflows = function getWorkflows() {
      workflowDAO.getWorkflows().
      then($scope.workflowsRetrieved);
    };
  });
}(window.angular));
