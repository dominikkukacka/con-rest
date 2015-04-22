(function fielCScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('fileC', function fileC($scope, fileDAO, events) {

    $scope.file = $scope.file || {
      _id: $scope.id || null,
      name: null
    };

    $scope.buffer = null;


    // Notify the parent the registration of the call has been successful.
    $scope.emitRegistrationSuccessfull = function emitRegistrationSuccessfull(id) {
      $scope.file._id = id;
      $scope.$emit(events.REGISTRATION_SUCCESSFUL, id);
    };

    // Register a new call to be executed.
    $scope.createFile = function createFile() {
      fileDAO.createFile({
        name: $scope.file.name,
      }, $scope.buffer).then($scope.emitRegistrationSuccessfull, $scope.emitRegistrationFailed);
    };

    // Notify the parent the request couldn't be saved successfully.
    $scope.emitRegistrationFailed = function emitRegistrationFailed(response) {
      $scope.$emit(events.REGISTRATION_FAILED, response);
    };

    $scope.requestCancelEditing = function requestCancelEditing() {
      $scope.$emit(events.CANCEL_EDITING);
    };

    // Leave the logic whether the call exists or not out of the view.
    $scope.save = function save() {
      if (!$scope.file._id) {
        $scope.createFile();
      } else {
        $scope.updateFile();
      }
    };

    $scope.updateFile = function updateFile() {
      fileDAO.updateFile($scope.file, $scope.buffer)
        .then($scope.restCallUpdated);
    };

    $scope.fileUpdated = function fileUpdated(response) {
      $scope.$emit(events.FILE_UPDATED, response);
    };
  });
}(window.angular));
