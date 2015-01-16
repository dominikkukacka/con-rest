(function connectorCScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('connectorC', function connectorC($scope, mapperDAO, connectorDAO, events) {
    $scope.workflowId = $scope.workflowId || null;
    $scope.map = null;
    $scope.availableMappers = null;

    $scope.getMappers = function getMappers() {
      mapperDAO.getAll()
        .then(function setMappers(maps) {
          $scope.availableMappers = maps;
        });
    };

    $scope.save = function save() {
      connectorDAO.create($scope.workflowId, $scope.map)
        .then(function publishCreated(id) {
          $scope.$emit(events.CONNECTOR_CREATED, id);
        });
    };
  });
}(window.angular));
