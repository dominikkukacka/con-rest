// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallSpecs() {
    'use strict';

    describe('Rest Call View Model specs', function restCallSpecs() {

        var scope, httpBackend, events;
        beforeEach(module('con-rest'));

        beforeEach(inject(function ($controller, $rootScope, $httpBackend, _events_) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            events = _events_;
            $controller('restCallVM', {
                $scope: scope
            });
        }));

        it('should register a rest call', function registerRestCall() {
            // given
            var response = null;
            givenGetCallSettings();

            // when
            scope.$on(events.REGISTRATION_SUCCESSFUL, function registrationSuccessful(event, res) {
                response = res;
            });
            httpBackend.expect('POST', '/api/requests', {
                name: scope.request.name,
                url: scope.request.url,
                method: scope.request.method,
                data: scope.request.data,
                headers: scope.request.headers
            }).respond(200, 'someguidid');
            scope.registerCall();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(response.data).toEqual('someguidid');
            expect(scope.id).toEqual('someguidid');
        });

        it('should display an handle errors accordingly', function emitFailed() {
            // given
            var response = null;

            // when
            scope.$on(events.REGISTRATION_FAILED, function requestFailed(event, res) {
                response = res;
            });
            httpBackend.when('POST', '/api/requests').respond(400, 'bad request');
            scope.registerCall();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(400);
            expect(response.data).toEqual('bad request');
        });

        it('should execute the rest call', function executeCall() {
            // given
            var response = null;
            scope.id = 'abc';
            httpBackend.expect('POST', '/api/requests/' + scope.id + '/execute').
                respond(200, 'ok');

            // when
            scope.$on(events.RESPONSE_RECEIVED, function receivedResponse(event, res) {
                response = res;
            });
            scope.executeCall();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(response.data).toEqual('ok');
            expect(scope.response).toEqual(response);
        });

        it('should notify the parent when an request failed', function failedRequest() {
            // given
            var response = null;
            scope.id = 'abc';
            httpBackend.expect('POST', '/api/requests/' + scope.id + '/execute').
                respond(404, 'not found');

            // when
            scope.$on(events.REQUEST_FAILED, function requestFailed(event, res) {
                response = res;
            });
            scope.executeCall();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(404);
            expect(response.data).toEqual('not found');
            expect(scope.response).toEqual(response);
        });

        it('should get the registered call', function getRequest() {
            // given
            var response = null;
            scope.id = 'abc';
            var expectedResponse = {
                _id: scope.id,
                name: 'ba',
                url: 'http://ba.na.na',
                method: 'DELETE',
                data: '{ "message": "chomp" }'
            };
            httpBackend.expect('GET', '/api/requests/' + scope.id).
                respond(200, expectedResponse);

            // when
            scope.$on(events.REQUEST_RETRIEVED, function requestRetrieved(event, res) {
                response = res;
            });
            scope.getCall();

            // then
            httpBackend.flush();
            expect(scope.request._id).toEqual(expectedResponse._id);
            expect(scope.request.name).toEqual(expectedResponse.name);
            expect(scope.request.url).toEqual(expectedResponse.url);
            expect(scope.request.method).toEqual(expectedResponse.method);
            expect(scope.request.data).toEqual(expectedResponse.data);
        });

        it('should get a list of registered api calls', function getApiCall() {
            // given
            var response = null;
            var responseDetails = [
                {
                    '_id': '545c8129e0e00d50095212c5',
                    'name': 'Chikita',
                    'url': 'http://url.info',
                    'method': 'GET',
                    'data': {
                        'ba': 'nana'
                    },
                    '__v': 0
                }
            ];
            httpBackend.expect('GET', '/api/requests/').
                respond(200, responseDetails);

            // when
            scope.$on(events.REQUESTS_RETRIEVED, function requestsReceived(event, res) {
                response = res;
            });
            scope.getAvailableRequests();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(scope.availableCalls).toEqual(response.data);
        });

        it('should set the attributes of the provided request', function providedRequest() {
            // given
            scope.request = {
                _id: '545c8129e0e00d50095212c5'
            };
            var response = null;
            var responseDetails = [
                {
                    '_id': '545c8129e0e00d50095212c5',
                    'name': 'Chikita',
                    'url': 'http://url.info',
                    'method': 'GET',
                    'data': {
                        'ba': 'nana'
                    },
                    '__v': 0
                }
            ];
            httpBackend.expect('GET', '/api/requests/').
                respond(200, responseDetails);

            // when
            scope.$on(events.REQUESTS_RETRIEVED, function requestsReceived(event, res) {
                response = res;
            });
            scope.getAvailableRequests();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(scope.request.name).toEqual(response.data[0].name);
            expect(scope.availableCalls).toEqual(response.data);
        });

        function givenGetCallSettings() {
            scope.request.name = 'fakeCall';
            scope.request.url = 'http://fake.url';
            scope.request.method = 'GET';
            scope.request.data = {
                ba: 'nana'
            };
            scope.request.headers = {
                foo: 'bar'
            };
        }
    });
}());
