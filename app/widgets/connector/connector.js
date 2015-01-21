(function connectorDirectiveScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('connector', function connectorDirective() {
    return {
      restrict: 'E',
      scope: {
        id: '=id',
        workflowId: '=workflowId'
      },
      controller: 'connectorVM',
      templateUrl: 'connector',
      link: function connectorConstructor(scope) {
        scope.load();
      }
    };
  });
}(window.angular));
