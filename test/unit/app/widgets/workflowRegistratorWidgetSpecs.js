// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowRegistratorWidgetSpecs() {
    'use strict';

    describe('workflow registrator widget specs', function workflowRegistratorWidgetSpecs() {
        var $httpBackend;
        var parentScope;
        var testGlobals;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(_events_, testSetup) {
            testGlobals = testSetup.setupDirectiveTest();
            parentScope = testGlobals.parentScope;
            $httpBackend = testGlobals.$httpBackend;
        }));

        it('should load the calls in the workflow when an workflow model has been provided', function loadRestCalls() {
            // given
            parentScope.workflow = testGlobals.createDefaultWorkflow();
            var directive = angular.element('<workflow-registrator workflow="workflow"></workflow-registrator>');

            // Child widget is calling for all requests
            $httpBackend.when('GET', '/api/requests/').
                respond(200, []);

            // when
            var scope = testGlobals.initializeDirective(parentScope, directive);

            // then
            testGlobals.expectWorkflows(scope.workflow).toEqual(parentScope.workflow);
        });
    });
}());
