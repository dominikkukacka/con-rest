module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  import WorkflowVM = WorkflowVMS.WorkflowVM;
  import Call = Models.Call;
  import Connector = Models.Connector;
  var expect = chai.expect;

  library
    .given('the update will be executed', () => {
      var workflowVM: WorkflowVM = ctx.$scope.vm;
      sinon.spy(ctx.$scope.vm.$location, 'path');
      var calls = [];
      workflowVM.workflow.calls.forEach((call: Call) => {
        calls.push(call._id);
      });
      var connectors = [];
      workflowVM.workflow.connectors.forEach((connector: Connector) => {
        connectors.push(connector);
      });
      ctx.$httpBackend.expect('PUT', '/api/workflows/w1o2r3k4f5l6o7w8', {
        _id: 'w1o2r3k4f5l6o7w8',
        name: workflowVM.workflow.name,
        calls: calls,
        connectors: connectors
      }).respond(200, 'ok');
    });
}
