(function connectorRegistratorDirectiveScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('connectorRegistrator', function connectorRegistratorDirective() {
    return {
      restrict: 'E',
      scope: {
        workflowId: '=workflowId'
      },
      controller: 'connectorC',
      templateUrl: 'connectorRegistrator'
    };
  });
}(window.angular));
