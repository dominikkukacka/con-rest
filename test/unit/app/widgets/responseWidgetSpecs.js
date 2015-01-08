/**
 * Created by Stefan Schacherl on 16.12.2014.
 */

(function responseWidgetSpecs(){
    'use strict';

    describe('response widget specs', function responseWidgetSpecs() {
        var $httpBackend;
        var parentScope;
        var testGlobals;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(testSetup) {
            testGlobals = testSetup.setupDirectiveTest();
            parentScope = testGlobals.parentScope;
            $httpBackend = testGlobals.$httpBackend;
        }));

        it('should display the provided response', function providedResponse() {
            // given
            parentScope.response = testGlobals.createDefaultResponse();
            var directive = angular.element('<response response="response"></response>');

            // when
            var scope = testGlobals.initializeDirective(parentScope, directive);

            // then
            testGlobals.expectResponse(scope.response).toEqual(parentScope.response);
        });
    });
}());