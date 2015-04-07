// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallVMScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('restCallVM', function restCallVMScope($scope, $mdDialog, events, $timeout, requestDAO) {
    // The id can be provided by the parent.

    // Request can be passed a long or it could be empty.
    $scope.request = $scope.request || {
      _id: $scope.id || null,
      name: null,
      url: null,
      type: null,
      method: null,
      data: null,
      headers: null,
      files: []
    };
    $scope.originalRequest = angular.copy($scope.request);
    $scope.response = null;

    // A list of all available calls.
    $scope.availableCalls = null;

    // UI related properties
    $scope.showCalls = false;
    $scope.editing = false;

    $scope.startEditing = function startEditing() {
      $scope.editing = true;
    };

    $scope.cancelEditing = function cancelEditing(event) {
      event.stopPropagation();
      $scope.editing = false;
    };

    // Open the available requests
    $scope.openAvailableRequests = function openAvailableRequests() {
      $scope.showCalls = true;
    };

    // Close the availabe requests
    $scope.closeAvailableRequests = function closeAvailableRequests() {
      // The scope is in conflict with the click function when we apply directly.
      $timeout(function workAroundForBlur() {
        $scope.showCalls = false;
        $scope.$apply();
      }, 100);
    };

    // Select call, this is not the requst.
    $scope.selectCall = function selectCall(selectedCall) {
      $scope.request.name = selectedCall.name;
      $scope.request._id = selectedCall._id;
      $scope.showCalls = false;
    };

    // Get the registered call by id.
    $scope.getCall = function getCall() {
      requestDAO.getCall($scope.request._id)
        .then($scope.populateRequest, $scope.emitRetrievalFailed);
    };

    // Get all the registered calls and populate the requests list.
    $scope.getAvailableRequests = function getAvailableRequests() {
      requestDAO.getAvailableRequests()
        .then($scope.retrievedRequests);
    };

    // The request should set the attributes so the pointer will be to the same
    // model. This will allow the other consumers of this model to receive the update
    // aswell.
    $scope.populateRequest = function populateRequest(request) {
      $scope.request._id = request._id;
      $scope.request.name = request.name;
      $scope.request.url = request.url;
      $scope.request.type = request.type;
      $scope.request.method = request.method;
      $scope.request.data = request.data;
      $scope.request.headers = request.headers;
      // emit the model.
      $scope.$emit(events.REQUEST_RETRIEVED, $scope.request);
    };

    $scope.confirmRestCallDeletion = function confirmRestCallDeletion(event) {
      // The dialog is an modal window.
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to remove this API call [' + $scope.request.name + ']?')
        .content('The API call will be deleted permanently!')
        .ok('REMOVE API CALL')
        .cancel('KEEP API CALL')
        .targetEvent(event);

      // Showing the dialog will return a promise, based on what the user choose.
      $mdDialog.show(confirm).then($scope.removeRestCallOnConfirm);
    };

    $scope.removeRestCallOnConfirm = function removeRestCallOnConfirm() {
      // We should move the remove functionality to the restCallVM #51.
      if ($scope.request._id) {
        $scope.removeRestCall();
      } else {
        $scope.removeRestCallFromModel();
      }
    };

    $scope.removeRestCall = function removeRestCall() {
      // Remove the rest call from the server, before removing from the view.
      requestDAO.remove($scope.request._id)
        .then($scope.removeRestCallFromModel);
    };

    $scope.removeRestCallFromModel = function removeRestCallFromModel() {
      // Remove the restcall now that the server has removed it too.
      $scope.$emit(events.REQUEST_DELETED, $scope.originalRequest);
      $scope.request = null;
    };

    $scope.executeRestCall = function executeRestCall(request) {
      requestDAO.executeCall(request._id)
        .then($scope.restCallExecuted(request),
          $scope.restCallExecutionFailed(request));
    };

    $scope.restCallExecuted = function restCallExecuted(request) {
      // Should be moved to the restCallVM #51
      return function wrapperRestCallExecuted() {
        request.success = true;
      };
    };

    $scope.restCallExecutionFailed = function restCallExecutionFailed(request) {
      return function wrapperRestCallFailed() {
        request.success = false;
      };
    };

    // Execute the registered call.
    $scope.executeCall = function executeCall() {
      requestDAO.executeCall($scope.request._id)
        .then($scope.emitResponse, $scope.emitRequestFailed);
    };

    // Making the emit response public, allows for the response to be send manually.
    $scope.emitResponse = function emitResponse(response) {
      $scope.response = response;
      $scope.$emit(events.RESPONSE_RECEIVED, response);
    };

    // Emit failures to the parent, so this can be handled accordingly.
    $scope.emitRequestFailed = function emitRequestFailed(response) {
      $scope.response = response;
      $scope.$emit(events.REQUEST_FAILED, response);
    };

    // Notify the parent the retrieval of the request failed.
    $scope.emitRetrievalFailed = function emitRetrievalFailed(response) {
      $scope.$emit(events.RETRIEVAL_FAILED, response);
    };

    // Notify the requests have been retrieved.
    $scope.retrievedRequests = function retrievedRequests(availableCalls) {
      $scope.availableCalls = availableCalls;
      if ($scope.request._id) {
        for (var i = 0; i < availableCalls.length; i++) {
          var call = availableCalls[i];
          if (call._id === $scope.request._id) {
            $scope.request.name = call.name;
            break;
          }
        }
      }
      $scope.$emit(events.REQUESTS_RETRIEVED, availableCalls);
      if (!$scope.$root.$$phase) {
        $scope.$evalAsync();
      }
    };
  });
}(window.angular));
