// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallWidgetSpecs() {
    'use strict';

    describe('restCall widget specs', function restCallWidgetSpecs() {
        var $rootScope;
        var $httpBackend;
        var $compile;
        var events;
        var parentScope;
        var testGlobals;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(_$rootScope_, _$httpBackend_, _$compile_, _events_, testSetup) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $compile = _$compile_;
            events = _events_;
            parentScope = $rootScope.$new();
            testGlobals = testSetup.setupDirectiveTest();
        }));

        it('should load the restCall when an id has been provided', function loadRestCall() {
            // given
            parentScope.id = 'someid';
            var directive = angular.element('<rest-call id="' + parentScope.id + '"></rest-call>');
            var expectedRequest = testGlobals.createDefaultRequest();

            $httpBackend.expect('GET', '/api/requests/' + parentScope.id).
                respond(200, expectedRequest);

            // when
            var scope = initalizeDirective(parentScope, directive);
            $httpBackend.flush();

            // then
            testGlobals.expectRequest(scope.request).toEqual(expectedRequest);
        });

        it('should directly enter editing mode when no id and rest call model is provided', function startEditing() {
            // given
            var directive = angular.element('<rest-call></rest-call>');
            var expectedRequest = testGlobals.createEmptyRequest();

            // when
            var scope = initalizeDirective(parentScope, directive);

            // then
            testGlobals.expectRequest(scope.request).toEqual(expectedRequest);
        });

        it('should display the provided rest call', function providedCall() {
            // given
            parentScope.restCall = testGlobals.createDefaultRequest();
            var directive = angular.element('<rest-call rest-call="restCall"></rest-call>');

            // when
            var scope = initalizeDirective(parentScope, directive);

            // then
            expect(scope.request.name).toEqual(parentScope.restCall.name);
            expect(scope.request.url).toEqual(parentScope.restCall.url);
            expect(scope.request.method).toEqual(parentScope.restCall.method);
            expect(scope.request.data).toEqual(parentScope.restCall.data);
            expect(scope.request.headers).toEqual(parentScope.restCall.headers);
        });

        function initalizeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope so we can run some tests on it
            return directive.children().scope();
        }
    });
}());
