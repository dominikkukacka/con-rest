// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function fileVMScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('fileVM', function fileVMScope($scope, $mdDialog, events, $timeout, $location, requestDAO) {
    // The id can be provided by the parent.

    // Request can be passed a long or it could be empty.
    $scope.file = $scope.file || {
      _id: $scope.id || null,
      name: null
    };
    $scope.originalFile = angular.copy($scope.file);

    // UI related properties
    $scope.editing = false;

    $scope.startEditing = function startEditing() {
      $scope.editing = true;
    };

    $scope.cancelEditing = function cancelEditing(event) {
      event.stopPropagation();
      $scope.editing = false;
    };

    // Select call, this is not the requst.
    $scope.selectFile = function selectFile(selectedFile) {
      $scope.request.name = selectedFile.name;
      $scope.request._id = selectedFile._id;
    };

    // Get the registered call by id.
    $scope.getFile = function getFile() {
      requestDAO.getFile($scope.request._id)
        .then($scope.populateRequest, $scope.emitRetrievalFailed);
    };

  });
}(window.angular));
