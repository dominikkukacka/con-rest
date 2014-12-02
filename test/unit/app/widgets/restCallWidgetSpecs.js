// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallWidgetSpecs() {
    'use strict';

    describe('restCall widget specs', function restCallWidgetSpecs() {
        var $httpBackend;
        var parentScope;
        var testGlobals;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(testSetup) {
            testGlobals = testSetup.setupDirectiveTest();
            parentScope = testGlobals.parentScope;
            $httpBackend = testGlobals.$httpBackend;
        }));

        it('should load the restCall when an id has been provided', function loadRestCall() {
            // given
            testGlobals.parentScope.id = 'someid';
            var directive = angular.element('<rest-call id="' + parentScope.id + '"></rest-call>');
            var expectedRequest = testGlobals.createDefaultRequest();

            $httpBackend.expect('GET', '/api/requests/' + parentScope.id).
                respond(200, expectedRequest);

            // when
            var scope = testGlobals.initializeDirective(parentScope, directive);
            $httpBackend.flush();

            // then
            testGlobals.expectRequest(scope.request).toEqual(expectedRequest);
        });

        it('should directly enter editing mode when no id and rest call model is provided', function startEditing() {
            // given
            var directive = angular.element('<rest-call></rest-call>');
            var expectedRequest = testGlobals.createEmptyRequest();

            // when
            var scope = testGlobals.initializeDirective(parentScope, directive);

            // then
            testGlobals.expectRequest(scope.request).toEqual(expectedRequest);
        });

        it('should display the provided rest call', function providedCall() {
            // given
            parentScope.restCall = testGlobals.createDefaultRequest();
            var directive = angular.element('<rest-call rest-call="restCall"></rest-call>');

            // when
            var scope = testGlobals.initializeDirective(parentScope, directive);

            // then
            testGlobals.expectRequest(scope.request).toEqual(parentScope.restCall);
        });
    });
}());
