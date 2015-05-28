module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import ERRORS = Models.ERRORS;
  import Execution = Models.Execution;
  var expect = chai.expect;

  library
    .given('parent has execution', () => {
      ctx.$parent.execution = new Execution({
        _id: 'e1x2e3c4u5t6i7o8n9',
        workflow: 'w1o2r3k4f5l6o7w8',
        apiCall: 'c1a2l3l4',
        statusCode: 200,
        url: 'conrest.com',
        response: 'ok',
        headers: null,
        data: null,
        executedAt: new Date().getTime()
      });
    })
    .then('the execution is displayed', () => {
      expect(ctx.$scope.vm.execution).to.equal(ctx.$parent.execution);
    });
}
