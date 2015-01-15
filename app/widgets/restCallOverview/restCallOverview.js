/**
 * Created by sschacherl on 27.11.2014.
 */
(function restCallOverview(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('restCallOverview', function restCallOverviewDirective() {
    return {
      controller: 'restCallOverviewVM',
      restrict: 'E',
      scope: {},
      templateUrl: 'restCallOverview',
      link: function restCallOverviewConstructor(scope) {
        scope.getRestCalls();
      }
    };
  });
}(window.angular));
