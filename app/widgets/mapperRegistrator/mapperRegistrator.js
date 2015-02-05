(function mapperRegistratorDirectiveScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('mapperRegistrator', function mapperRegistratorDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'mapperC',
      templateUrl: 'mapperRegistrator',
      link: function mapperRegistratorConstructor(scope) {
        // Add a default map on initialization.
        scope.addMap();

        scope.$watch('maps', function autoAdd(newMaps) {
          var lastMap = newMaps[newMaps.length - 1];
          if (!!lastMap.place && !!lastMap.source && !!lastMap.destination) {
            scope.addMap();
          }
        }, true);
      }
    };
  });
}(window.angular));
