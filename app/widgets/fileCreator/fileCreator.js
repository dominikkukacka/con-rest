// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function fileCreatoreScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.directive('fileCreator', function fileCreatorDirective() {
    return {
      controller: 'fileC',
      restrict: 'EA',
      scope: {
        file: '=?file'
      },
      templateUrl: 'fileCreator'
    };
  });
}(window.angular));
