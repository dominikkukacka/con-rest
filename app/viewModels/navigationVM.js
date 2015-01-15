// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function navigationVM(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('navigationVM', function navigationVMScope($scope, $mdSidenav, sitemap) {
    $scope.menu = sitemap;

    $scope.showNavigation = function showNavigation() {
      // navigation is a html fragment defined in `index.html`
      $mdSidenav('navigation').open();
    };

    $scope.hideNavigation = function hideNavigation() {
      $mdSidenav('navigation').close();
    };
  });
}(window.angular));
