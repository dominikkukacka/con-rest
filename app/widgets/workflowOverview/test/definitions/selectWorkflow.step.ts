module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .when('I select workflow $NUM', (workflow: string) => {
      var workflowIndex = parseInt(workflow, 10) - 1;
      var selectedWorkflow = ctx.$scope.vm.workflows[workflowIndex];
      ctx.$scope.vm.select(selectedWorkflow);
    })
    .then('the stored session workflow has $NUM connectors', (numberOfConnectors: string) => {
      var amountOfConnectors = parseInt(numberOfConnectors, 10);
      expect(ctx.session.workflow.connectors.length).to.equal(amountOfConnectors);
    })
    .then('the stored session workflow has $NUM calls', (numberOfCalls: string) => {
      var amountOfCalls = parseInt(numberOfCalls, 10);
      expect(ctx.session.workflow.calls.length).to.equal(amountOfCalls);
    });
}
