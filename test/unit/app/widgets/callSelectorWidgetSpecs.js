// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function callSelectorWidgetSpecs() {
    'use strict';

    describe('callSelector widget specs', function callSelectorWidgetSpecs() {
        var $rootScope;
        var $httpBackend;
        var $compile;
        var events;
        var parentScope;

        beforeEach(module('con-rest'));

        beforeEach(inject(function setupTests(_$rootScope_, _$httpBackend_, _$compile_, _events_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $compile = _$compile_;
            events = _events_;
            parentScope = $rootScope.$new();
        }));

        it('should load the call selector and the name should be set accordingly', function loadcallSelector() {
            // given
            parentScope.request = { _id: 'someid' };
            var directive = angular.element('<call-selector request="request"></call-selector>');
            var availableRequests = [
                {
                    _id: 'someid',
                    name: 'fakeCall',
                    url: 'https://fake.url',
                    method: 'PUT',
                    data: { ba: 'nana' },
                    headers: { to: 'ken' }
                }
            ];

            $httpBackend.expect('GET', '/api/requests/').
                respond(200, availableRequests);

            // when
            var scope = initalizeDirective(parentScope, directive);
            $httpBackend.flush();

            // then
            expect(scope.request._id).toEqual(availableRequests[0]._id);
            expect(scope.request.name).toEqual(availableRequests[0].name);
        });

        function initalizeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope so we can run some tests on it
            return directive.children().scope();
        }
    });
}());
