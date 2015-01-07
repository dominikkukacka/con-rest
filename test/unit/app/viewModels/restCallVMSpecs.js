// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallVMSpecs() {
    'use strict';

    describe('Rest Call View Model specs', function restCallVMSpecs() {

        var scope, $httpBackend, events, testGlobals;
        beforeEach(module('con-rest-test'));

        beforeEach(inject(function(testSetup) {
            testGlobals = testSetup.setupControllerTest('restCallVM');
            scope = testGlobals.scope;
            $httpBackend = testGlobals.$httpBackend;
            events = testGlobals.events;
        }));

        it('should register a rest call', function registerRestCall() {
            // given
            var response = null;
            testGlobals.givenRequest(scope.request).isDefault();

            // when
            scope.$on(events.REGISTRATION_SUCCESSFUL, function registrationSuccessful(event, res) {
                response = res;
            });
            $httpBackend.expect('POST', '/api/requests', {
                name: scope.request.name,
                url: scope.request.url,
                method: scope.request.method,
                data: scope.request.data,
                headers: scope.request.headers
            }).respond(200, 'someguidid');
            scope.registerCall();

            // then
            $httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(response.data).toEqual('someguidid');
            expect(scope.request._id).toEqual('someguidid');
        });

        it('should display an handle errors accordingly', function emitFailed() {
            // given
            var response = null;

            // when
            scope.$on(events.REGISTRATION_FAILED, function requestFailed(event, res) {
                response = res;
            });
            $httpBackend.when('POST', '/api/requests').respond(400, 'bad request');
            scope.registerCall();

            // then
            $httpBackend.flush();
            expect(response.status).toEqual(400);
            expect(response.data).toEqual('bad request');
        });

        it('should execute the rest call', function executeCall() {
            // given
            var response = null;
            scope.request._id = 'abc';
            $httpBackend.expect('POST', '/api/requests/' + scope.request._id + '/executions').
            respond(200, 'ok');

            // when
            scope.$on(events.RESPONSE_RECEIVED, function receivedResponse(event, res) {
                response = res;
            });
            scope.executeCall();

            // then
            $httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(response.data).toEqual('ok');
            expect(scope.response).toEqual(response);
        });

        it('should notify the parent when an request failed', function failedRequest() {
            // given
            var response = null;
            scope.request._id = 'abc';
            $httpBackend.expect('POST', '/api/requests/' + scope.request._id + '/executions').
            respond(404, 'not found');

            // when
            scope.$on(events.REQUEST_FAILED, function requestFailed(event, res) {
                response = res;
            });
            scope.executeCall();

            // then
            $httpBackend.flush();
            expect(response.status).toEqual(404);
            expect(response.data).toEqual('not found');
            expect(scope.response).toEqual(response);
        });

        it('should get the registered call', function getRequest() {
            // given
            var response = null;
            scope.request._id = 'abc';
            var expectedResponse = testGlobals.createDefaultRequest();
            $httpBackend.expect('GET', '/api/requests/' + scope.request._id).
            respond(200, expectedResponse);

            // when
            scope.$on(events.REQUEST_RETRIEVED, function requestRetrieved(event, res) {
                response = res;
            });
            scope.getCall();

            // then
            $httpBackend.flush();
            testGlobals.expectRequest(scope.request).toEqual(expectedResponse);
        });

        it('should get a list of registered api calls', function getApiCall() {
            // given
            var response = null;
            var responseDetails = testGlobals.createDefaultRequests();
            $httpBackend.expect('GET', '/api/requests/').
            respond(200, responseDetails);

            // when
            scope.$on(events.REQUESTS_RETRIEVED, function requestsReceived(event, res) {
                response = res;
            });
            scope.getAvailableRequests();

            // then
            $httpBackend.flush();
            expect(scope.availableCalls).toEqual(response);
        });

        it('should set the attributes of the provided request', function providedRequest() {
            // given
            scope.request = testGlobals.createDefaultRequest();
            var response = null;
            var responseDetails = testGlobals.createDefaultRequests();
            $httpBackend.expect('GET', '/api/requests/').
            respond(200, responseDetails);

            // when
            scope.$on(events.REQUESTS_RETRIEVED, function requestsReceived(event, res) {
                response = res;
            });
            scope.getAvailableRequests();

            // then
            $httpBackend.flush();
            expect(scope.request.name).toEqual(response[0].name);
            expect(scope.availableCalls).toEqual(response);
        });
    });
}());
