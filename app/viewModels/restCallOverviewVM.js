/**
 * Created by Stefan Schacherl on 27.11.2014.
 */
(function restCallOverviewVM(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('restCallOverviewVM', function restCallOverviewVM($scope, $mdDialog, events, requestDAO) {
    $scope.restCalls = [];

    $scope.getRestCalls = function getRestCalls() {
      requestDAO.getAll()
        .then($scope.restCallsRetrieved);
    };

    $scope.restCallsRetrieved = function restCallsRetrieved(restCalls) {
      $scope.restCalls = restCalls;
      $scope.$emit(events.REQUESTS_RETRIEVED, restCalls);
    };

  });
}(window.angular));
