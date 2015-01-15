// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workFlowCSpecs() {
  'use strict';

  describe('wofkFlowC Specs', function workFlowCSpecs() {
    var scope, $httpBackend, events, testGlobals;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup) {
      testGlobals = testSetup.setupControllerTest('workFlowC');
      scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
    }));

    it('should create a new workflow', function createNewWorkFlow() {
      // given
      var response = null;
      scope.workflow.name = 'workflowName';
      scope.workflow.calls = [{
        _id: 'callone'
      }, {
        _id: 'calltwo'
      }];
      var expectedWorkflow = {
        name: 'workflowName',
        calls: ['callone', 'calltwo']
      };
      $httpBackend.expect('POST', '/api/workflows/', expectedWorkflow)
        .
      respond(200, 'someguidid');

      // when
      scope.$on(events.WORKFLOW_CREATED, function workFlowCreated(event, res) {
        response = res;
      });
      scope.save();

      // then
      $httpBackend.flush();
      expect(response).toEqual('someguidid');
      expect(scope.workflow._id).toEqual('someguidid');
    });

    it('should save changes to an existing workflow', function saveExistingWorkflow() {
      // given
      var response = null;
      scope.workflow = testGlobals.createDefaultWorkflow();
      var workflowDetails = testGlobals.createDefaultRequestWorkflow();
      $httpBackend.expect('PUT', '/api/workflows/' + scope.workflow._id,
        workflowDetails).
      respond(200, 'ok');

      // when
      scope.$on(events.WORKFLOW_UPDATED, function workFlowCreated(event, res) {
        response = res;
      });
      scope.save();

      // then
      $httpBackend.flush();
      expect(response).toEqual('ok');
    });

    it('should request cancel editing', function cancelEditing() {
      // given
      spyOn(scope, '$emit');

      // when
      scope.requestCancel();

      // then
      expect(scope.$emit).toHaveBeenCalledWith(events.CANCEL_EDITING);
    });

    it('should remove a REST call from the workflow by its index', function removeCall() {
      // given
      scope.workflow = testGlobals.createDefaultWorkflow();

      // when
      scope.removeCall(1);

      // then
      expect(scope.workflow.calls.length).toEqual(2);
      expect(scope.workflow.calls[0]._id).toEqual('someid');
      expect(scope.workflow.calls[1]._id).toEqual('someid3');
    });

    describe('saving functionality', function savingSpecs() {
      it('should create a workflow', function createWorkflow() {
        // given
        scope.workflow._id = null;
        spyOn(scope, 'createNewWorkflow').andCallThrough();

        // when
        scope.save();

        // then
        expect(scope.createNewWorkflow).toHaveBeenCalled();
      });

      it('should save the changes on an existing workflow', function saveChanges() {
        // given
        scope.workflow._id = '12304';
        spyOn(scope, 'updateWorkflow').andCallThrough();

        // when
        scope.save();

        // then
        expect(scope.updateWorkflow).toHaveBeenCalled();
      });
    });

  });
}());
