// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function file(angular, undefined) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('file', function fileDirective(events) {
    return {
      controller: 'fileVM',
      restrict: 'E',
      scope: {
        id: '@id',
        file: '=?file'
      },
      templateUrl: 'file',
      link: function fileConstructor(scope) {
        if (scope.id) {
          scope.getFile(scope.id);
        }

        scope.$on(events.CANCEL_EDITING, scope.cancelEditing);
      }
    };
  });
}(window.angular));
