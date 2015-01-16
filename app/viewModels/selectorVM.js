(function selectorVMScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('selectorVM', function selectorVM($scope) {
    $scope.value = null;
    $scope.options = [];
  });
}(window.angular));
