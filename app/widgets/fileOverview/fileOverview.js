/**
 * Created by sschacherl on 27.11.2014.
 */
(function fileOverview(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('fileOverview', function fileOverviewDirective(events) {
    return {
      controller: 'fileOverviewVM',
      restrict: 'E',
      scope: {},
      templateUrl: 'fileOverview',
      link: function fileOverviewConstructor(scope) {
        scope.getFiles();

        scope.$on(events.FILE_DELETED, scope.removedFile);
      }
    };
  });
}(window.angular));
