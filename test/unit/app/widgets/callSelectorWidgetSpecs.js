// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function callSelectorWidgetSpecs() {
    'use strict';

    describe('callSelector widget specs', function callSelectorWidgetSpecs() {
        var testGlobals;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(testSetup) {
            testGlobals = testSetup.setupDirectiveTest();
        }));

        it('should load the call selector and the name should be set accordingly', function loadcallSelector() {
            // given
            testGlobals.parentScope.request = { _id: 'someid' };
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

            testGlobals.$httpBackend.expect('GET', '/api/requests/').
                respond(200, availableRequests);

            // when
            var scope = testGlobals.initializeDirective(testGlobals.parentScope, directive);
            testGlobals.$httpBackend.flush();

            // then
            expect(scope.request._id).toEqual(availableRequests[0]._id);
            expect(scope.request.name).toEqual(availableRequests[0].name);
        });
    });
}());
