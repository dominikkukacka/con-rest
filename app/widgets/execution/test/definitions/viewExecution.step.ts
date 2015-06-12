module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  import Execution = Models.Execution;
  var expect = chai.expect;

  library
    .given('parent has execution', () => {
      ctx.execution = {
        _id: 'e1x2e3c4u5t6i7o8n9',
        workflow: 'w1o2r3k4f5l6o7w8',
        apiCall: 'c1a2l3l4',
        statusCode: 200,
        url: 'conrest.com',
        response: 'ok',
        headers: null,
        data: null,
        executedAt: new Date().getTime()
      };
      ctx.$parent.execution = new Execution(ctx.execution);
    })
    .given('the execution can be found', () => {
      ctx.execution = {
        _id: 'e1x2e3c4u5t6i7o8n9',
        workflow: 'w1o2r3k4f5l6o7w8',
        apiCall: 'c1a2l3l4',
        statusCode: 200,
        url: 'conrest.com',
        response: 'ok',
        headers: null,
        data: null,
        executedAt: new Date().getTime()
      };
      ctx.$httpBackend.expect('GET', '/api/executions/e1x2e3c4u5t6i7o8n9')
        .respond(200, ctx.execution);
    })
    .then('the execution is displayed', () => {
      expect(ctx.$scope.vm.execution._id).to.equal(ctx.execution._id);
    });
}
