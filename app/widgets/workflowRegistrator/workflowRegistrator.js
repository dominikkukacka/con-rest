// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('workflowRegistrator', function workflowDirective() {
    return {
      controller: 'workFlowC',
      restrict: 'E',
      scope: {
        originalWorkflow: '=workflow'
      },
      templateUrl: 'workflowRegistrator'
    };
  });
}(window.angular));
