module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  var expect = chai.expect;
  import WorkflowExecution = Models.WorkflowExecution;
  import Workflow = Models.Workflow;
  import Execution = Models.Execution;
  import IWorkflowExecution = Models.IWorkflowExecution;

  var defaultWorkflowExecution: IWorkflowExecution = {
    _id: 'w1e2x3i4d5',
    workflow: 'w1i2d3',
    executedAt: new Date().getTime(),
    executions: [{
      _id: 'e1x2i3d4'
    }]
  };

  library
    .given('the parent provides workflow execution', () => {
      ctx.$parent.workflowExecution = new WorkflowExecution(defaultWorkflowExecution);
    })
    .then('the server finds the workflow execution', () => {
      ctx.$httpBackend.expect('GET', '/api/workflows/w1o2r3k4f5l6o7w8/executions/w1e2x3i4d5')
        .respond(200, defaultWorkflowExecution);
    })
    .then('the workflow execution is displayed', () => {
      expect(ctx.$scope.vm.workflowExecution._id).to.equal(defaultWorkflowExecution._id);
      expect(ctx.$scope.vm.workflowExecution.workflow._id)
        .to.equal(defaultWorkflowExecution.workflow);
    });
}
