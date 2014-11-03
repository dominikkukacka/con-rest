// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallVMScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('restCallVM', function restCallVMScope($scope, $http, events) {
        // API related properties
        $scope.id = null;
        $scope.name = null;
        $scope.method = null;
        $scope.params = null;
        $scope.response = null;
        $scope.url = null;

        // UI related properties
        $scope.openMethods = false;
        $scope.availableMethods = ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'];

        // Open the dropdown for methods.
        $scope.toggleMethodsDropdown = function toggleMethodsDropdown() {
            $scope.openMethods = !$scope.openMethods;
        };

        // Select method
        $scope.selectMethod = function selectMethod(selectedMethod) {
            $scope.method = selectedMethod;
            $scope.openMethods = false;
        };

        // Get the registered call by id.
        $scope.getCall = function getCall() {
            $http.get('/api/requests/' + $scope.id).
                then($scope.populateRequest, $scope.emitRetrievalFailed);
        };

        // Register a new call to be executed.
        $scope.registerCall = function registerCall() {
            $http.post('/api/requests', {
                name: $scope.name,
                url: $scope.url,
                method: $scope.method,
                data: $scope.params,
                headers: $scope.headers
            }).then($scope.emitRegistrationSuccessfull, $scope.emitRegistrationFailed);
        };

        $scope.populateRequest = function populateRequest(response) {
            var request = response.data;
            $scope.name = request.name;
            $scope.url = request.url;
            $scope.method = request.method;
            $scope.params = request.data;
            $scope.$emit(events.REQUEST_RETRIEVED, request);
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
    });
}(window.angular));