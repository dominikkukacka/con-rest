/**
 * Created by Stefan Schacherl on 27.01.2015.
 */
(function workflowListOverview(angular){
    'use strict';

    var app = angular.module('con-rest');

  app.directive('workflowListOverview', function workflowListOverviewDirective(events) {
    return {
      controller: 'workflowOverviewVM',
      restrict: 'E',
      scope: {},
      templateUrl: 'workflowListOverview',
      link: function workflowListOverviewConstructor(scope) {
        scope.getWorkflows();
        scope.showDetails = false;

        scope.$on(events.WORKFLOW_REQUESTED, scope.showWorkflowDetails);
      }
    };
  });
}(window.angular));