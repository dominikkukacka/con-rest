/**
 * Created by Stefan Schacherl on 27.11.2014.
 */
(function restCallOverviewVM(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('restCallOverviewVM', function restCallOverviewVM($scope, $mdDialog, events, requestDAO) {
    $scope.restCalls = [];

    $scope.removedRestCall = function removedRestCall(event, restCall) {
      event.stopPropagation();
      var index;
      $scope.restCalls.forEach(function findCall(call, iterator) {
        if (call._id === restCall._id) {
          index = iterator;
        }
      });
      $scope.restCalls.splice(index, 1);
    };

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
