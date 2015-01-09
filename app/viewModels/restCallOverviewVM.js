/**
 * Created by Stefan Schacherl on 27.11.2014.
 */
(function restCallOverviewVM(angular) {
	'use strict';

	var app = angular.module('con-rest');

	app.controller('restCallOverviewVM', function restCallOverviewVM($scope, $mdDialog, events, requestDAO) {
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
					$scope.removeRestCallFromModel(restCall)();
				}
			};
		};

		$scope.removeRestCall = function removeRestCall(restCall) {
			requestDAO.remove(restCall._id)
				.then($scope.removeRestCallFromModel(restCall));
		};

		$scope.removeRestCallFromModel = function removeRestCallFromModel(restCall) {
			return function removeWrapper() {
				var index = $scope.restCalls.indexOf(restCall);
				$scope.restCalls.splice(index, 1);
			};
		};

		$scope.executeRestCall = function executeRestCall(restCall) {
			requestDAO.executeCall(restCall._id)
				.then($scope.restCallExecuted(restCall),
					$scope.restCallExecutionFailed(restCall));
		};

		$scope.restCallExecuted = function restCallExecuted(restCall) {
			return function wrapperRestCallExecuted() {
				restCall.success = true;
			};
		};

		$scope.restCallExecutionFailed = function restCallExecutionFailed(restCall) {
			return function wrapperRestCallFailed() {
				restCall.success = false;
			};
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
