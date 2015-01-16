(function selectorVMScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('selectorVM', function selectorVM($scope, $timeout) {
    $scope.label = $scope.label || 'select';
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

    // Toggle the options open.
    $scope.openOptions = function openOptions() {
      $scope.isOpen = true;
    };

    // Select call, this is not the requst.
    $scope.select = function select(selectedValue) {
      $scope.value = selectedValue;
      $scope.isOpen = false;
    };
  });
}(window.angular));
