/**
 * Created by Stefan Schacherl on 27.01.2015.
 */
(function workflowListItem(angular, undefined){
  'use strict';

  var app = angular.module('con-rest');

  app.directive('workflowListItem', function workflowListItemDirective(events) {
    return {
      controller: 'workFlowVM',
      restrict: 'E',
      scope: {
        originalWorkflow: '=workflow',
        isActive: '=?isActive'
      },
      templateUrl: 'workflowListItem',
      link: function workflowListItemConstructor(scope) {
        if (scope.workflow._id === undefined) {
          scope.editing = true;
        }

        scope.$on(events.WORKFLOW_CREATED, scope.endEditing);
        scope.$on(events.WORKFLOW_UPDATED, scope.endEditing);
        scope.$on(events.CANCEL_EDITING, scope.endEditing);
      }
    };
  });
}(window.angular));
