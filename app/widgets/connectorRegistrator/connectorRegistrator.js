(function connectorRegistratorDirectiveScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('connectorRegistrator', function connectorRegistratorDirective(Mapper) {
    return {
      restrict: 'E',
      scope: {
        connector: '=connector'
      },
      controller: 'connectorC',
      templateUrl: 'connectorRegistrator',
      link: function connectorRegistratorConstructor(scope) {
        scope.getMappers();

        scope.$watch('source', function updateModel(newSource) {
          scope.connector.setSource(newSource._id);
        }, true);

        scope.$watch('destination', function updateModel(newDestination) {
          scope.connector.setDestination(newDestination._id);
        }, true);

        scope.$watch('mapper', function updateModel(newMapper) {
          scope.connector.setMapper(new Mapper(newMapper));
        }, true);
      }
    };
  });
}(window.angular));
