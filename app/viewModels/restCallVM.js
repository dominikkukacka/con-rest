// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallVMScope(angular) {
	'use strict';

	var app = angular.module('con-rest');

	app.controller('restCallVM', function restCallVMScope($scope, events, $timeout, requestDAO) {
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
			$scope.request.method = request.method;
			$scope.request.data = request.data;
			$scope.request.headers = request.headers;
			// emit the model.
			$scope.$emit(events.REQUEST_RETRIEVED, $scope.request);
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
		};
	});
}(window.angular));
