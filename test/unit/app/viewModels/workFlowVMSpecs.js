// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowVMSpecs() {
    'use strict';

    describe('wofkFlowVM Specs', function workFlowVMSpecs() {
        var scope, httpBackend, events;
        beforeEach(module('con-rest'));

        beforeEach(inject(function ($controller, $rootScope, $httpBackend, _events_) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            events = _events_;
            $controller('workFlowVM', {
                $scope: scope
            });
        }));

        it('should create a new workflow', function createNewWorkFlow() {
            // given
            var response = null;
            scope.name = 'workflowName'
            var workflowDetails = {
                name: 'workflowName',
                calls: []
            };
            httpBackend.expect('POST', '/api/workflows/', workflowDetails).
                respond(200, 'someguidid');

            // when
            scope.$on(events.WORKFLOW_CREATED, function workFlowCreated(event, res) {
                response = res;
            });
            scope.createNewWorkflow();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(response.data).toEqual('someguidid');
            expect(scope.workflow.id).toEqual('someguidid');
        });

        it('should load an existing workflow', function addNewWorkFlow() {
            // given
            var response = null;
            var responseDetails = {
                name: 'workflow1',
                calls: ['callid1', 'callid2']
            };
            scope.workflow.id = 'abc123';
            httpBackend.expect('GET', '/api/workflows/' + scope.workflow.id).
                respond(200, responseDetails);

            // when
            scope.$on(events.WORKFLOW_RECEIVED, function workFlowReceived(event, res) {
                response = res;
            });
            scope.getWorkflow();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(scope.name).toEqual(responseDetails.name);
            expect(scope.calls).toEqual(responseDetails.calls);
        });

        it('should save changes to an existing workflow', function saveExistingWorkflow() {
            // given
            var response = null;
            scope.name = 'workflowName';
            scope.calls = ['call1', 'call3'];
            var workflowDetails = {
                name: scope.name,
                calls: scope.calls
            };
            httpBackend.expect('PUT', '/api/workflows/' + scope.workflow.id, workflowDetails).
                respond(200, 'ok');

            // when
            scope.$on(events.WORKFLOW_UPDATED, function workFlowCreated(event, res) {
                response = res;
            });
            scope.updateWorkflow();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(response.data).toEqual('ok');
        });

        describe('saving functionality', function savingSpecs() {
            it('should create a workflow', function createWorkflow() {
                // given
                scope.id = null;
                spyOn(scope, 'createNewWorkflow');

                // when
                scope.save();

                // then
                expect(scope.createNewWorkflow).toHaveBeenCalled();
            });

            it('should save the changes on an existing workflow', function saveChanges() {
                // given
                scope.workflow.id = '12304';
                spyOn(scope, 'updateWorkflow');

                // when
                scope.save();

                // then
                expect(scope.updateWorkflow).toHaveBeenCalled();
            });
        });
    });

}());
