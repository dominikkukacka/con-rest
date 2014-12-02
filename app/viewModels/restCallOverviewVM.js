/**
 * Created by Stefan Schacherl on 27.11.2014.
 */
(function restCallOverviewVM(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('restCallOverviewVM', function restCallOverviewVM($scope, $http, $mdDialog, events) {
        $scope.restCalls = [];

        $scope.addRestCall = function addRestCall() {
            $scope.restCalls.push({
                name: 'New API call',
                url: '',
                method: '',
                data: {},
                headers: {}
            });
        };

        $scope.confirmRestCallDeletion = function confirmRestCallDeletion(event, restCall) {
            var confirm = $mdDialog.confirm().
                title('Are you sure you want to remove this API call [' + restCall.name + ']?').
                content('The API call will be deleted permanently!').
                ok('REMOVE API CALL').
                cancel('KEEP API CALL').
                targetEvent(event);
            $mdDialog.show(confirm).then($scope.removeRestCallOnConfirm(restCall));
        };

        $scope.removeRestCallOnConfirm = function removeRestCallOnConfirm(restCall) {
            return function removeRestCallWrapper() {
                if (restCall._id) {
                    $scope.removeRestCall(restCall);
                } else {
                    $scope.removeRestCallFromModel(restCall);
                }
            };
        };

        $scope.removeRestCall = function removeRestCall(restCall) {
            $http.delete('/api/requests/' + restCall._id).
                then($scope.removeRestCallFromModel(restCall));
        };

        $scope.removeRestCallFromModel = function removeRestCallFromModel(restCall) {
            return function removeWrapper() {
                var index = $scope.restCalls.indexOf(restCall);
                $scope.restCalls.splice(index, 1);
            };
        };

        $scope.getRestCalls = function getRestCalls() {
            $http.get('/api/requests/').
                then($scope.restCallsRetrieved);
        };

        $scope.restCallsRetrieved = function restCallsRetrieved(response) {
            $scope.restCalls = response.data;
            $scope.$emit(events.REQUESTS_RETRIEVED, response);
        };

    });
}(window.angular));