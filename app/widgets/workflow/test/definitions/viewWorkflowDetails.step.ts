module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('the server finds the workflow', () => {
      ctx.workflow = {
        _id: 'w1o2r3k4f5l6o7w8',
        name: 'Awesome Workflow',
        calls: [
          'c1i2d3o4n5e6',
          'c1i2d3t4w5o6'
        ],
        connectors: [
          'c1o2i3d4o5n6e7',
          'c1o2i3d4t5w6o7'
        ]
      };
      ctx.$httpBackend.expect('GET', '/api/workflows/w1o2r3k4f5l6o7w8')
        .respond(200, ctx.workflow);
      ctx.$httpBackend.when('GET', /\/api\/requests\/(.*)/)
        .respond(200, {
          _id: 'someid'
        });
    })
    .then('the workflow is displayed', () => {
      expect(ctx.$scope.vm.workflow._id).to.equal(ctx.workflow._id);
      expect(ctx.$scope.vm.workflow.name).to.equal(ctx.workflow.name);
      expect(ctx.$scope.vm.workflow.calls.length).to.equal(ctx.workflow.calls.length);
      expect(ctx.$scope.vm.workflow.connectors.length).to.equal(ctx.workflow.connectors.length);
    });
}
