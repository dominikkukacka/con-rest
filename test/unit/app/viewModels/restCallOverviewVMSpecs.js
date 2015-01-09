/**
 * Created by Stefan Schacherl on 03.12.2014.
 */
(function restCallOverviewVMSpecs() {
	'use strict';

	describe('restCallOverviewVM specs', function restCallOverviewVMSpecs() {
		var scope, httpBackend, events, testGlobals;
		beforeEach(module('con-rest-test'));

		beforeEach(inject(function(testSetup, _events_) {
			testGlobals = testSetup.setupControllerTest('restCallOverviewVM');
			scope = testGlobals.scope;
			httpBackend = testGlobals.$httpBackend;
			events = _events_;
		}));

		it('should load all rest calls', function loadExistingRestCalls() {
			// given
			var response = null;
			var restCalls = testGlobals.createDefaultRequests();
			httpBackend.expect('GET', '/api/requests/').
			respond(200, restCalls);

			// when
			scope.$on(events.REQUESTS_RETRIEVED, function restCallCreated(event, res) {
				response = res;
			});
			scope.getRestCalls();

			// then
			httpBackend.flush();
			testGlobals.expectRequest(scope.restCalls[0]).toEqual(restCalls[0]);
		});

		it('should remove a rest call', function removeRestCall() {
			// given
			scope.restCalls = testGlobals.createDefaultRequests();

			httpBackend.expect('DELETE', '/api/requests/someid').
			respond(200, 'ok');

			// when
			scope.removeRestCallOnConfirm(scope.restCalls[0])();
			httpBackend.flush();

			// then
			expect(scope.restCalls.length).toEqual(2);
			expect(scope.restCalls[0]._id).toEqual('someid2');
			expect(scope.restCalls[1]._id).toEqual('someid3');
		});

		it('should remove an unsaved rest call', function removeUnsavedRestCall() {
			// given
			scope.restCalls = [];
			scope.addRestCall();

			// when
			scope.removeRestCallOnConfirm(scope.restCalls[0])();

			// then
			expect(scope.restCalls.length).toEqual(0);
		});

		it('should execute a rest call', function executeRestCall() {
			// given
			scope.restCalls = [{
				_id: 'executeCall'
			}];

			httpBackend.expect('POST', '/api/requests/executeCall/executions').
			respond(200, 'ok');

			// when
			scope.executeRestCall(scope.restCalls[0]);
			httpBackend.flush();

			// then
			expect(scope.restCalls[0].success).toEqual(true);
		});
	});
}());
