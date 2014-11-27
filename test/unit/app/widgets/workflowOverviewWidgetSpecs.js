// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowOverviewWidgetSpecs() {
    'use strict';

    describe('workflow overview widget specs', function workflowOverviewWidgetSpecs() {
        var $rootScope;
        var $httpBackend;
        var $compile;
        var events;
        var $mdDialog;
        var parentScope;
        var oneWorkflow = [
            {
                _id: 'someid',
                name: 'workflow1',
                calls: ['call1', 'call2']
            }
        ];

        beforeEach(module('con-rest'));

        beforeEach(inject(function setupTests(_$rootScope_, _$httpBackend_, _$compile_, _events_, _$mdDialog_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $compile = _$compile_;
            events = _events_;
            $mdDialog = _$mdDialog_;
            parentScope = $rootScope.$new();
        }));

        it('should load an overview of all registered workflows', loadWorkflowOverview);

        it('should delete a workflow', function requestWorkflowDeletion() {
            // given
            var scope = loadWorkflowOverview();
            var fakeEvent = {};
            spyOn($mdDialog, 'show').andCallThrough();
            spyOn(scope, 'removeWorkflowOnConfirm');

            // when
            scope.confirmWorkflowDeletion(fakeEvent, {
                _id: 'myFakeId',
                name: 'workflowname'
            });

            // then
            expect($mdDialog.show).toHaveBeenCalled();
            expect(scope.removeWorkflowOnConfirm).toHaveBeenCalledWith('myFakeId');
        });

        function loadWorkflowOverview() {
            // given
            var directive = angular.element('<workflow-overview></workflow-overview>');

            $httpBackend.expect('GET', '/api/workflows/').
                respond(200, oneWorkflow);
            // In this test we don't care what the child widgets are doing.
            $httpBackend.when('GET', /\/api\/requests\/*/).respond(200, {});

            // when
            var scope = initalizeDirective(parentScope, directive);
            $httpBackend.flush();

            // then
            expect(scope.workflows[0].name).toEqual(oneWorkflow[0].name);
            expect(scope.workflows[0].calls[0]._id).toEqual(oneWorkflow[0].calls[0]);
            expect(scope.workflows[0].calls[1]._id).toEqual(oneWorkflow[0].calls[1]);
            return scope;
        }

        function initalizeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope so we can run some tests on it
            return directive.children().scope();
        }
    });
}());
