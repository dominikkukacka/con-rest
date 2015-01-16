(function selectorVMScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('selectorVM', function selectorVM($scope, $timeout) {
    $scope.value = $scope.value || null;
    $scope.options = $scope.options || [];
    $scope.isOpen = false;

    // Close the availabe requests
    $scope.closeOptions = function closeOptions() {
      // The scope is in conflict with the click function when we apply directly.
      $timeout(function workAroundForBlur() {
        $scope.isOpen = false;
        $scope.$apply();
      }, 100);
    };
  });
}(window.angular));
