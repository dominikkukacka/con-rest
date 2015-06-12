module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('$NUM workflows have been registered', (numberOfWorkflows: string) => {
      var workflows = parseInt(numberOfWorkflows, 10);
      for (var i = 0; i < workflows; i++) {
        ctx.workflows.push({
          _id: 'wfid' + i,
          name: 'workflow ' + i,
          connectors: [],
          calls: []
        });
      }
    })
    .given('workflow $NUM contains $NUM connector(:?s){0,1}', (workflow: string, numberOfConnectors: string) => {
      var workflowIndex = parseInt(workflow, 10) - 1;
      var amountOfConnectors = parseInt(numberOfConnectors, 10);
      var connectors = ctx.workflows[workflowIndex].connectors;
      for (var i = 0; i < amountOfConnectors; i++) {
        connectors.push('wfid' + workflowIndex + 'cid' + i);
      }
    })
    .given('workflow $NUM contains $NUM call(:s){0,1}', (workflow: string, numberOfCalls: string) => {
      var workflowIndex = parseInt(workflow, 10) - 1;
      var amountOfCalls = parseInt(numberOfCalls, 10);
      var calls = ctx.workflows[workflowIndex].calls;
      for (var i = 0; i < amountOfCalls; i++) {
        calls.push('wfid' + workflowIndex + 'cid' + i);
      }
    })
    .given('the workflows will be received successfully', () => {
      ctx.$httpBackend.expect('GET', '/api/workflows/')
        .respond(200, ctx.workflows);
    })
    .then('workflow $NUM has $NUM connectors', (workflow: string, connectors: string) => {
      var workflowIndex = parseInt(workflow, 10) - 1;
      var amountOfConnectors = parseInt(connectors, 10);
      expect(ctx.$scope.vm.workflows[workflowIndex].connectors.length).to.equal(amountOfConnectors);
    })
    .then('workflow $NUM has $NUM calls', (workflow: string, calls: string) => {
      var workflowIndex = parseInt(workflow, 10) - 1;
      var amountOfCalls = parseInt(calls, 10);
      expect(ctx.$scope.vm.workflows[workflowIndex].calls.length).to.equal(amountOfCalls);
    });
}
