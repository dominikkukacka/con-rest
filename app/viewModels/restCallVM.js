// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallVMScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('restCallVM', function restCallVMScope($scope, $http, events) {
        $scope.id = null;
        $scope.url = null;
        $scope.method = null;
        $scope.params = null;
        $scope.type = null;
        $scope.response = null;

        // Register a new call to be executed.
        $scope.registerCall = function registerCall() {
            $http.post('/api/requests', {
                url: $scope.url,
                method: $scope.method,
                data: $scope.params,
                headers: $scope.headers
            }).then($scope.emitRegistrationSuccessfull, $scope.emitRegistrationFailed);
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
    });
}(window.angular));