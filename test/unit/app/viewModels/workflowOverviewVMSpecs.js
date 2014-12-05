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

        beforeEach(inject(function (testSetup) {
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

        it('should remove an workflow', function removeWorkflow() {
            // given
            scope.workflows = [
                {
                    _id: 'not this one'
                },
                {
                    _id: 'this one'
                },
                {
                    _id: 'also not this one'
                }
            ];

            $httpBackend.expect('DELETE', '/api/workflows/' + 'this one').
                respond(200, 'ok');

            // when
            scope.removeWorkflowOnConfirm(scope.workflows[1])();
            $httpBackend.flush();

            // then
            expect(scope.workflows.length).toEqual(2);
            expect(scope.workflows[0]._id).toEqual('not this one');
            expect(scope.workflows[1]._id).toEqual('also not this one');
        });

        it('should remove an unsaved workflow', function removeUnsavedWorkflow() {
            // given
            scope.workflows = [];
            scope.addWorkflow();

            // when
            scope.removeWorkflowOnConfirm(scope.workflows[0])();

            // then
            expect(scope.workflows.length).toEqual(0);
        });

        it('should execute a workflow', function executeWorkflow() {
            // given
            scope.workflows = testGlobals.createDefaultWorkflows();

            $httpBackend.expect('POST', '/api/workflows/flowid/executions').
                respond(200, 'ok');

            // when
            scope.executeWorkflow(scope.workflows[0]);
            $httpBackend.flush();

            // then
            expect(scope.workflows[0].success).toEqual(true);
        });

        it('should fail an execution of an workflow', function executionFailed() {
            // given
            scope.workflows = testGlobals.createDefaultWorkflows();

            $httpBackend.expect('POST', '/api/workflows/flowid/executions').
                respond(400, 'bad request');

            // when
            scope.executeWorkflow(scope.workflows[0]);
            $httpBackend.flush();

            // then
            expect(scope.workflows[0].success).toEqual(false);
        });
    });
}());