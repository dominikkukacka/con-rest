// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallVMScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('restCallVM', function restCallVMScope($scope, $http, events) {
        // The id can be provided by the parent.
        $scope.id = $scope.id || null;

        // Request can be passed a long or it could be empty.
        $scope.request = $scope.request || {
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
        $scope.showCalls = false;

        // Open the dropdown for methods.
        $scope.toggleMethodsDropdown = function toggleMethodsDropdown() {
            $scope.openMethods = !$scope.openMethods;
        };

        // Select method
        $scope.selectMethod = function selectMethod(selectedMethod) {
            $scope.request.method = selectedMethod;
            $scope.openMethods = false;
        };

        // Open the available requests
        $scope.openAvailableRequests = function openAvailableRequests() {
            $scope.showCalls = true;
        };

        // Select call, this is not the requst.
        $scope.selectCall = function selectCall(selectedCall) {
            $scope.request.name = selectedCall.name;
            $scope.request._id = selectedCall._id;
            $scope.showCalls = false;
        };

        // Get the registered call by id.
        $scope.getCall = function getCall() {
            $http.get('/api/requests/' + $scope.id).
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
                data: $scope.request.params,
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
            $scope.request.params = request.data;
            $scope.request.headers = request.headers;
            // emit the model.
            $scope.$emit(events.REQUEST_RETRIEVED, $scope.request);
        };

        // Execute the registered call.
        $scope.executeCall = function executeCall() {
            $http.post('/api/requests/' + $scope.id + '/execute').
                then($scope.emitResponse, $scope.emitRequestFailed);
        };

        // Notify the parent the registration of the call has been successful.
        $scope.emitRegistrationSuccessfull = function emitRegistrationSuccessfull(response) {
            $scope.id = response.data;
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
            if ($scope.request.id) {
                for (var i = 0; i < response.data.length; i++) {
                    var call = response.data[i];
                    if (call._id === $scope.request.id) {
                        $scope.request.name = call.name;
                        break;
                    }
                }
            }
            $scope.$emit(events.REQUESTS_RETRIEVED, response);
        };
    });
}(window.angular));
