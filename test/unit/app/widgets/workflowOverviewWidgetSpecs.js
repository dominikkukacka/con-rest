// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowOverviewWidgetSpecs() {
    'use strict';

    describe('workflow overview widget specs', function workflowOverviewWidgetSpecs() {
        var $httpBackend;
        var $mdDialog;
        var parentScope;
        var testGlobals;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(_$mdDialog_, testSetup) {
            $mdDialog = _$mdDialog_;
            testGlobals = testSetup.setupDirectiveTest();
            $httpBackend = testGlobals.$httpBackend;
            parentScope = testGlobals.parentScope;
        }));

        it('should load an overview of all registered workflows', loadWorkflowOverview);

        it('should delete a workflow', function requestWorkflowDeletion() {
            // given
            var scope = loadWorkflowOverview();
            var expectedEvent = {};
            var expectedWorkflow = testGlobals.createDefaultWorkflow();
            spyOn($mdDialog, 'show').andCallThrough();
            spyOn(scope, 'removeWorkflowOnConfirm');

            // when
            scope.confirmWorkflowDeletion(expectedEvent, expectedWorkflow);

            // then
            expect($mdDialog.show).toHaveBeenCalled();
            expect(scope.removeWorkflowOnConfirm).toHaveBeenCalledWith(expectedWorkflow);
        });


        it('should remove an unsaved workflow on cancel', function removeUnsavedWorkflowOnCancel() {
            // given
            var scope = loadWorkflowOverview();
            scope.workflows = [];
            scope.addWorkflow();

            // when
            scope.$$childHead.$emit(events.WORKFLOW_DELETED, scope.workflows[0]);

            // then
            expect(scope.workflows.length).toEqual(0);
        });

        function loadWorkflowOverview() {
            // given
            var directive = angular.element('<workflow-overview></workflow-overview>');
            var expectedWorkflows = testGlobals.createDefaultWorkflows();

            $httpBackend.expect('GET', '/api/workflows/').
                respond(200, expectedWorkflows);
            // In this test we don't care what the child widgets are doing.
            $httpBackend.when('GET', /\/api\/requests\/*/).respond(200, {});

            // when
            var scope = testGlobals.initializeDirective(parentScope, directive);
            $httpBackend.flush();

            // then
            testGlobals.expectWorkflows(scope.workflows).toMatch(expectedWorkflows);
            return scope;
        }
    });
}());
