(function connectorVMScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('connectorVM', function connectorVM($scope, connectorDAO) {
    $scope.id = $scope.id || null;
    $scope.workflowId = $scope.workflowId || null;

    $scope.load = function load() {
      return connectorDAO.get($scope.id, $scope.workflowId)
        .then(function setOnVM(connector) {
          $scope.connector = connector;
        });
    };
  });
}(window.angular));
