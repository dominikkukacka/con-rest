/**
 * Created by Stefan Schacherl on 03.12.2014.
 */
(function restCallOverviewVMSpecs() {
    'use strict';

    describe('restCallOverviewVM specs', function restCallOverviewVMSpecs() {
        var scope, httpBackend, events;
        beforeEach(module('con-rest'));

        beforeEach(inject(function ($controller, $rootScope, $httpBackend, _events_) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            events = _events_;
            $controller('restCallOverviewVM', {
                $scope: scope
            });
        }));
        it('should load all rest calls', function loadExistingRestCalls() {
            // given
            var response = null;
            var restCalls = [
                {
                    _id: 'fakeId',
                    name: 'fakerestcall',
                    url: 'http://some.fake.url/api/test',
                    type: 'payload',
                    data: {fakeparam1: 'fakedata1'},
                    headers: {hparam1: "fakeheader1", hparam2: "fakeheader2"}
                }
            ];
            httpBackend.expect('GET', '/api/requests/').
                respond(200, restCalls);

            // when
            scope.$on(events.REQUESTS_RETRIEVED, function restCallCreated(event, res) {
                response = res;
            });
            scope.getRestCalls();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(scope.restCalls[0].name).toEqual(restCalls[0].name);
            expect(scope.restCalls[0].url).toEqual(restCalls[0].url);
            expect(scope.restCalls[0].type).toEqual(restCalls[0].type);
            expect(scope.restCalls[0].data).toEqual(restCalls[0].data);
            expect(scope.restCalls[0].headers).toEqual(restCalls[0].headers);
        });

        it('should remove a rest call', function removeRestCall() {
            // given
            scope.restCalls = [
                {
                    _id: 'this one is okay'
                },
                {
                    _id: 'do not'
                },
                {
                    _id: 'nope'
                }
            ];

            httpBackend.expect('DELETE', '/api/requests/' + 'this one is okay').
                respond(200, 'ok');

            // when
            scope.removeRestCallOnConfirm(scope.restCalls[0])();
            httpBackend.flush();

            // then
            expect(scope.restCalls.length).toEqual(2);
            expect(scope.restCalls[0]._id).toEqual('do not');
            expect(scope.restCalls[1]._id).toEqual('nope');
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
            scope.restCalls = [
                {
                    _id: 'executeCall'
                }
            ];

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