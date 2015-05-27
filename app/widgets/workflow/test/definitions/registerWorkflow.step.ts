module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import WorkflowVM = WorkflowVMS.WorkflowVM;
  import Call = Models.Call;
  var expect = chai.expect;

  library
    .given('I add call "(.*)"', (callId: string) => {
      var workflowVM: WorkflowVM = ctx.$scope.vm;
      workflowVM.workflow.calls.push(new Call({
        _id: callId
      }));
    })
    .given('the workflow will be registered with "(.*)"', (id: string) => {
      var workflowVM: WorkflowVM = ctx.$scope.vm;
      sinon.spy(ctx.$scope.vm.$location, 'path');
      var calls = [];
      workflowVM.workflow.calls.forEach((call: Call) => {
        calls.push(call._id);
      });
      ctx.$httpBackend.expect('POST', '/api/workflows/', {
        name: workflowVM.workflow.name,
        calls: calls
      }).respond(200, id);
    })
    .then('I should navigate to the workflow view with id "(.*)"', (id) => {
      expect(ctx.$scope.vm.$location.path).to.have.been
        .calledWith('/workflows/' + id);
    });
}
