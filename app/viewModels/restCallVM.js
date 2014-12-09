// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallVMScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('restCallVM', function restCallVMScope($scope, $http, events, $timeout) {
        // The id can be provided by the parent.

        // Request can be passed a long or it could be empty.
        $scope.request = $scope.request || {
            _id: $scope.id || null,
            name: null,
            url: null,
            method: null,
            data: null,
            headers: null
        };
        $scope.response = null;

        // A list of all available calls.
        $scope.availableCalls = null;

        // UI related properties
        $scope.openMethods = false;
        $scope.availableMethods = ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'];
        $scope.openTypes = false;
        $scope.availableTypes = ['formData', 'payload'];
        $scope.showCalls = false;
        $scope.editing = false;

        $scope.startEditing = function startEditing() {
            $scope.editing = true;
        };

        $scope.requestCancelEditing = function requestCancelEditing(){
            $scope.$emit(events.CANCEL_EDITING);
        };

        $scope.cancelEditing = function cancelEditing(event) {
            event.stopPropagation();
            $scope.editing = false;
        };

        // Open the dropdown for methods.
        $scope.toggleMethodsDropdown = function toggleMethodsDropdown() {
            $scope.openMethods = !$scope.openMethods;
        };

        // Select method
        $scope.selectMethod = function selectMethod(selectedMethod) {
            $scope.request.method = selectedMethod;
            $scope.openMethods = false;
        };

        // Open the dropdown for types.
        $scope.toggleTypesDropdown = function toggleTypesDropdown() {
            $scope.openTypes = !$scope.openTypes;
        };

        // Select type
        $scope.selectType = function selectType(type) {
            $scope.request.type = type;
            $scope.openTypes = false;
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
            $http.get('/api/requests/' + $scope.request._id).
                then($scope.populateRequest, $scope.emitRetrievalFailed);
        };

        // Get all the registered calls and populate the requests list.
        $scope.getAvailableRequests = function getAvailableRequests() {
            $http.get('/api/requests/').
                then($scope.retrievedRequests);
        };

        // Register a new call to be executed.
        $scope.registerCall = function registerCall() {
            $http.post('/api/requests', {
                name: $scope.request.name,
                url: $scope.request.url,
                method: $scope.request.method,
                type: $scope.request.type,
                data: $scope.request.data,
                headers: $scope.request.headers
            }).then($scope.emitRegistrationSuccessfull, $scope.emitRegistrationFailed);
        };

        // The request should set the attributes so the pointer will be to the same
        // model. This will allow the other consumers of this model to receive the update
        // aswell.
        $scope.populateRequest = function populateRequest(response) {
            var request = response.data;
            $scope.request._id = request._id;
            $scope.request.name = request.name;
            $scope.request.url = request.url;
            $scope.request.method = request.method;
            $scope.request.data = request.data;
            $scope.request.headers = request.headers;
            // emit the model.
            $scope.$emit(events.REQUEST_RETRIEVED, $scope.request);
        };

        // Execute the registered call.
        $scope.executeCall = function executeCall() {
            $http.post('/api/requests/' + $scope.request._id + '/executions').
                then($scope.emitResponse, $scope.emitRequestFailed);
        };

        // Notify the parent the registration of the call has been successful.
        $scope.emitRegistrationSuccessfull = function emitRegistrationSuccessfull(response) {
            $scope.request._id = response.data;
            $scope.$emit(events.REGISTRATION_SUCCESSFUL, response);
        };

        // Making the emit response public, allows for the response to be send manually.
        $scope.emitResponse = function emitResponse(response) {
            $scope.response = response;
            $scope.$emit(events.RESPONSE_RECEIVED, response);
        };

        // Notify the parent the request couldn't be saved successfully.
        $scope.emitRegistrationFailed = function emitRegistrationFailed(response) {
            $scope.$emit(events.REGISTRATION_FAILED, response);
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
        $scope.retrievedRequests = function retrievedRequests(response) {
            $scope.availableCalls = response.data;
            if ($scope.request._id) {
                for (var i = 0; i < response.data.length; i++) {
                    var call = response.data[i];
                    if (call._id === $scope.request._id) {
                        $scope.request.name = call.name;
                        break;
                    }
                }
            }
            $scope.$emit(events.REQUESTS_RETRIEVED, response);
        };

        $scope.updateRestCall = function updateRestCall() {
            $http.put('/api/requests/' + $scope.request._id, $scope.request).
                then($scope.restCallUpdated);
        };

        $scope.restCallUpdated = function restCallUpdated(response) {
            $scope.$emit(events.REQUEST_UPDATED, response);
        };

        $scope.save = function save() {
            if(!$scope.request._id) {
                $scope.registerCall();
            } else {
                $scope.updateRestCall();
            }
        };
    });
}(window.angular));
