// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowVMSpecs() {
  'use strict';

  describe('wofkFlowVM Specs', function workFlowVMSpecs() {
    var scope, $httpBackend, events, testGlobals;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup) {
      testGlobals = testSetup.setupControllerTest('workFlowVM');
      scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
    }));

    it('should load an existing workflow', function addNewWorkFlow() {
      // given
      var response = null;
      var responseDetails = testGlobals.createDefaultWorkflow();
      scope.workflow._id = 'abc123';
      $httpBackend.expect('GET', '/api/workflows/' + scope.workflow._id)
        .
      respond(200, responseDetails);

      // when
      scope.$on(events.WORKFLOW_RECEIVED, function workFlowReceived(event, res) {
        response = res;
      });
      scope.getWorkflow();

      // then
      $httpBackend.flush();
      expect(scope.workflow.name).toEqual(responseDetails.name);
      expect(scope.workflow.calls[0]._id).toEqual(responseDetails.calls[0]);
      expect(scope.workflow.calls[1]._id).toEqual(responseDetails.calls[1]);
    });

    describe('removing functionality', function removeWorkflow() {
      it('should remove an workflow', function removeWorkflow() {
        // given
        scope.workflow = testGlobals.createDefaultWorkflow();

        $httpBackend.expect('DELETE', '/api/workflows/' + scope.workflow._id)
          .respond(200, 'ok');

        // when
        scope.removeWorkflowOnConfirm();
        $httpBackend.flush();

        // then
        expect(scope.workflow).toEqual(null);
      });

      it('should remove an unsaved workflow', function removeUnsavedWorkflow() {
        // given
        scope.workflow = testGlobals.createDefaultWorkflow();
        scope.workflow._id = null;

        // when
        scope.removeWorkflowOnConfirm();

        // then
        expect(scope.workflow).toEqual(null);
      });
    });

    describe('executing workflow', function executingWorkflowSpecs() {
      it('should execute a workflow', function executeWorkflow() {
        // given
        scope.workflow = testGlobals.createDefaultWorkflow();
        spyOn(scope, '$broadcast');

        $httpBackend.expect('POST', '/api/workflows/flowid/executions').
        respond(200, 'ok');

        // when
        scope.executeWorkflow();
        $httpBackend.flush();

        // then
        expect(scope.workflow.success).toEqual(true);
        expect(scope.$broadcast).toHaveBeenCalledWith(events.EXECUTION_DONE,
          jasmine.objectContaining({
            status: 200,
            data: 'ok'
          }));
      });

      it('should fail an execution of an workflow', function executionFailed() {
        // given
        scope.workflow = testGlobals.createDefaultWorkflow();
        spyOn(scope, '$broadcast');

        $httpBackend.expect('POST', '/api/workflows/flowid/executions').
        respond(400, 'bad request');

        // when
        scope.executeWorkflow();
        $httpBackend.flush();

        // then
        expect(scope.workflow.success).toEqual(false);
        expect(scope.$broadcast).toHaveBeenCalledWith(events.EXECUTION_DONE,
          jasmine.objectContaining({
            status: 400,
            data: 'bad request'
          }));
      });
    });
  });

}());
