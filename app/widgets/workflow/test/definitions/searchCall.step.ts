module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import WorkflowVM = WorkflowVMS.WorkflowVM;
  import Call = Models.Call;
  var expect = chai.expect;

  library
    .given('the server can find 3 calls', () => {
      ctx.calls = [{
        _id: 'o1n2e3',
        name: 'call one'
      }, {
        _id: 't1w2o3',
        name: 'call two'
      }, {
        _id: 't1h2r3e4e5',
        name: 'call three'
      }];
      ctx.$httpBackend.expect('GET', '/api/requests/?search=' + ctx.$scope.vm.callQuery)
        .respond(200, ctx.calls);
    })
    .when('I select call $NUM', (callNumber) => {
      var call = ctx.calls[parseInt(callNumber, 10) - 1];
      ctx.$scope.vm.selectedCall = new Call(call);
      ctx.$scope.vm.addCall();
    })
    .then('call $NUM should be added to the workflow', (callNumber) => {
      var callIndex = parseInt(callNumber, 10) - 1;
      var call = ctx.calls[callIndex];
      expect(ctx.$scope.vm.workflow.calls[0]._id)
        .to.equal(call._id);
      expect(ctx.$scope.vm.workflow.calls[0].name)
        .to.equal(call.name);
    });
}
