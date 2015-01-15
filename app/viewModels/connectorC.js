(function connectorCScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('connectorC', function connectorC($scope) {
    $scope.workflowId = null;
    $scope.map = null;
  });
}(window.angular));
