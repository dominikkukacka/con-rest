// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowOverviewVMSpecs() {
    'use strict';

    describe('workflowOverviewVM specs', function workflowOverviewVMSpecs() {
        var scope, httpBackend, events;
        beforeEach(module('con-rest'));

        beforeEach(inject(function ($controller, $rootScope, $httpBackend, _events_) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            events = _events_;
            $controller('workflowOverviewVM', {
                $scope: scope
            });
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
            var workflows = [
                {
                    name: 'somename',
                    calls: ['someid', 'moreids']
                }
            ]
            httpBackend.expect('GET', '/api/workflows/').
                respond(200, workflows);

            // when
            scope.$on(events.WORKFLOWS_RETRIEVED, function workFlowCreated(event, res) {
                response = res;
            });
            scope.getWorkflows();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(scope.workflows[0].name).toEqual(workflows[0].name);
            expect(scope.workflows[0].calls[0]._id).toEqual(workflows[0].calls[0]);
            expect(scope.workflows[0].calls[1]._id).toEqual(workflows[0].calls[1]);
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

            httpBackend.expect('DELETE', '/api/workflows/' + 'this one').
                respond(200, 'ok');

            // when
            scope.removeWorkflowOnConfirm(scope.workflows[1])();
            httpBackend.flush();

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
    });
}());