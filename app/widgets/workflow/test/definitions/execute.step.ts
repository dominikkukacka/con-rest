module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import Execution = Models.Execution;
  var expect = chai.expect;

  library
    .given('the execution will be successful', () => {
      ctx.execution = {
        _id: 'e1x2e3c4u5t6i7o8n9'
      };
      ctx.$httpBackend.expect('POST', '/api/workflows/w1o2r3k4f5l6o7w8/executions')
        .respond(200, ctx.execution);
      sinon.spy(ctx.$scope.vm.$location, 'path');
    })
    .then('I should navigate to the execution view with id "(.*)"', (id: string) => {
      expect(ctx.$scope.vm.$location.path).to.have.been
        .calledWith('/workflows/w1o2r3k4f5l6o7w8/executions/' + id);
    });
}
