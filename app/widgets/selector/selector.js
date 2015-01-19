(function selectorDirectiveScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('selector', function selectorDirective() {
    return {
      restrict: 'E',
      scope: {
        label: '@label',
        value: '=value',
        displayValue: '=?displayValue',
        options: '=options'
      },
      controller: 'selectorVM',
      templateUrl: 'selector',
      transclude: true,
      link: function selectorConstructor(scope, element) {
        element.find('input').on('blur', scope.closeOptions);
      }
    };
  });
}(window.angular));
