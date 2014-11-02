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
                name: scope.name,
                url: scope.url,
                method: 'GET',
                data: scope.params,
                headers: scope.headers
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

        function givenGetCallSettings() {
            scope.name = 'fakeCall';
            scope.url = 'http://fake.url';
            scope.method = 'GET';
            scope.params = {
                ba: 'nana'
            };
            scope.headers = {
                foo: 'bar'
            };
        }
    });
}());