(function selectorDirectiveScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('selector', function selectorDirective() {
    return {
      restrict: 'E',
      scope: {
        value: '=value',
        options: '=options'
      },
      controller: 'selectorVM',
      templateUrl: 'selector'
    };
  });
}(window.angular));
