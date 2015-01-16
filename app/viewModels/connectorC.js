(function connectorCScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('connectorC', function connectorC($scope, connectorDAO, events) {
    $scope.workflowId = $scope.workflowId || null;
    $scope.map = null;

    $scope.save = function save() {
      connectorDAO.create($scope.workflowId, $scope.map)
        .then(function publishCreated(id) {
          $scope.$emit(events.CONNECTOR_CREATED, id);
        });
    };
  });
}(window.angular));
