// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowOverviewVMSpecs() {
    'use strict';

    describe('workflowOverviewVM specs', function workflowOverviewVMSpecs() {
        var scope, $httpBackend, events, testGlobals;
        beforeEach(module('con-rest-test'));

        beforeEach(inject(function(testSetup) {
            testGlobals = testSetup.setupControllerTest('workflowOverviewVM');
            scope = testGlobals.scope;
            $httpBackend = testGlobals.$httpBackend;
            events = testGlobals.events;
        }));

        it('should add an empty workflow ready to be saved', function addEmptyWorkflow() {
            // given
            scope.workflows = [];

            // when
            scope.addWorkflow();

            // then
            expect(scope.workflows[0].name).toEqual('New Workflow');
            expect(scope.workflows[0].calls instanceof Array).toEqual(true);
        });

        it('should load all workflows', function loadExistingWorkflows() {
            // given
            var response = null;
            var workflows = testGlobals.createDefaultWorkflows();
            $httpBackend.expect('GET', '/api/workflows/').
            respond(200, workflows);

            // when
            scope.$on(events.WORKFLOWS_RETRIEVED, function workFlowCreated(event, res) {
                response = res;
            });
            scope.getWorkflows();

            // then
            $httpBackend.flush();
            expect(response.status).toEqual(200);
            testGlobals.expectWorkflows(scope.workflows).toMatch(workflows);
        });
    });
}());
