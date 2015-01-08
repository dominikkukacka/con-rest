// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowWidgetSpecsScope(angular) {
    'use strict';

    describe('workflow widget specs', function workflowWidgetSpecs() {
        var events;
        var parentScope;
        var testGlobals;
        var $httpBackend;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(testSetup, _events_) {
            testGlobals = testSetup.setupDirectiveTest();
            events = _events_;
            parentScope = testGlobals.parentScope;
            $httpBackend = testGlobals.$httpBackend;
        }));

        it('should end editing mode when the workflow has been created', function created() {
            // given
            parentScope.workflow = {};
            var directive = angular.element('<workflow workflow="workflow"></workflow>');
            var scope = testGlobals.initializeDirective(parentScope, directive);
            var responseDetails = testGlobals.createDefaultRequests();
            $httpBackend.expect('GET', '/api/requests/').
                respond(200, responseDetails);

            // when
            scope.$broadcast(events.WORKFLOW_CREATED);

            // then
            expect(scope.editing).toEqual(false);
        });

        it('should end editing mode when the workflow has been updated', function updated() {
            // given
            parentScope.workflow = {};
            var directive = angular.element('<workflow workflow="workflow"></workflow>');
            var scope = testGlobals.initializeDirective(parentScope, directive);

            // when
            scope.$broadcast(events.WORKFLOW_UPDATED);

            // then
            expect(scope.editing).toEqual(false);
        });

        it('should cancel editing', function cancelEditing() {
            // given
            parentScope.workflow = {};
            var directive = angular.element('<workflow workflow="workflow"></workflow>');
            var scope = testGlobals.initializeDirective(parentScope, directive);

            // when
            scope.$broadcast(events.CANCEL_EDITING);

            // then
            expect(scope.editing).toEqual(false);
        });

        it('should not modify the existing workflow when editing', function unedited() {
            // given
            var directive = angular.element('<workflow workflow="workflow"></workflow>');
            parentScope.workflow = {
                _id: 'someuberniceid',
                name: 'unmodifiedname',
                calls: ['unmodifiedcall1', 'unmodifiedcall2']
            };
            var scope = testGlobals.initializeDirective(parentScope, directive);
            var originalWorkflow = angular.copy(scope.workflow, {});

            // when
            scope.workflow.name = 'modifiedname';
            scope.workflow.calls.push('additional');
            scope.workflow.calls.shift();

            scope.endEditing();

            // then
            expect(parentScope.workflow).toEqual(originalWorkflow);
        });

        it('should update the model when save has been successful', function safeSuccess() {
            // given
            var responseDetails = testGlobals.createDefaultRequests();
            $httpBackend.when('GET', '/api/requests/').
                respond(200, responseDetails);

            var directive = angular.element('<workflow-registrator workflow="workflow"></workflow-registrator>');
            parentScope.workflow = {
                _id: 'someuberniceid',
                name: 'unmodifiedname',
                calls: ['unmodifiedcall1', 'unmodifiedcall2']
            };
            var scope = testGlobals.initializeDirective(parentScope, directive);
            var originalWorkflow = angular.copy(scope.workflow, {});
            spyOn(scope, 'updateWorkflow').andCallFake(function resolvePromise() {
                return {
                    then: function fakeThen(callback) {
                        callback();
                    }
                };
            });

            // when
            scope.workflow.name = 'modifiedname';
            scope.workflow.calls.push('additional');
            scope.workflow.calls.shift();

            scope.save();

            // then
            $httpBackend.flush();
            expect(parentScope.workflow).toEqual(scope.workflow);
            expect(parentScope.workflow).not.toEqual(originalWorkflow);
        });
    });
}(window.angular));