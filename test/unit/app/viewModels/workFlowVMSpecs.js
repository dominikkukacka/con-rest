// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowVMSpecs() {
    'use strict';

    describe('workFlowVM Specs', function workFlowVMSpecs() {
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
            scope.workflow.name = 'workflowName';
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
            expect(scope.workflow._id).toEqual('someguidid');
        });

        it('should load an existing workflow', function addNewWorkFlow() {
            // given
            var response = null;
            var responseDetails = {
                name: 'workflow1',
                calls: ['callid1', 'callid2']
            };
            scope.workflow._id = 'abc123';
            httpBackend.expect('GET', '/api/workflows/' + scope.workflow._id).
                respond(200, responseDetails);

            // when
            scope.$on(events.WORKFLOW_RECEIVED, function workFlowReceived(event, res) {
                response = res;
            });
            scope.getWorkflow();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(scope.workflow.name).toEqual(responseDetails.name);
            expect(scope.workflow.calls[0]._id).toEqual(responseDetails.calls[0]);
            expect(scope.workflow.calls[1]._id).toEqual(responseDetails.calls[1]);
        });

        it('should save changes to an existing workflow', function saveExistingWorkflow() {
            // given
            var response = null;
            scope.workflow = {
                _id: 'someid',
                name: 'workflowName',
                calls: [
                    {
                        _id: 'call1'
                    },
                    {
                        _id: 'call3'
                    }
                ]
            };
            var workflowDetails = {
                name: scope.workflow.name,
                calls: ['call1', 'call3']
            };
            httpBackend.expect('PUT', '/api/workflows/' + scope.workflow._id, workflowDetails).
                respond(200, 'ok');

            // when
            scope.$on(events.WORKFLOW_UPDATED, function workFlowCreated(event, res) {
                response = res;
            });
            scope.save();

            // then
            httpBackend.flush();
            expect(response.status).toEqual(200);
            expect(response.data).toEqual('ok');
        });

        describe('saving functionality', function savingSpecs() {
            it('should create a workflow', function createWorkflow() {
                // given
                scope.workflow._id = null;
                spyOn(scope, 'createNewWorkflow');

                // when
                scope.save();

                // then
                expect(scope.createNewWorkflow).toHaveBeenCalled();
            });

            it('should save the changes on an existing workflow', function saveChanges() {
                // given
                scope.workflow._id = '12304';
                spyOn(scope, 'updateWorkflow');

                // when
                scope.save();

                // then
                expect(scope.updateWorkflow).toHaveBeenCalled();
            });
        });
    });

}());
