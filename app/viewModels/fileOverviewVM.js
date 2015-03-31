/**
 * Created by Stefan Schacherl on 27.11.2014.
 */
(function fileOverviewVM(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('fileOverviewVM', function fileOverviewVM($scope, $mdDialog, events, fileDAO) {
    $scope.images = [];

    $scope.getFiles = function getFiles() {
      fileDAO.getAll()
        .then($scope.filesRetrieved);
    };

    $scope.filesRetrieved = function filesRetrieved(files) {
      $scope.files = files;
      $scope.$emit(events.FILES_RETRIEVED, files);
    };

  });
}(window.angular));
