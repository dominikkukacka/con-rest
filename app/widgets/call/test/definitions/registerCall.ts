/**
 * Created by sschacherl on 01.06.2015.
 */
module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import CallVM = CallVMS.CallVM;
  import Call = Models.Call;
  var expect = chai.expect;

  library
    .given('the call will be registered with "(.*)"', (callId: string) => {
      var callVM: CallVM = ctx.$scope.vm;
      sinon.spy(ctx.$scope.vm.$location, 'path');
      ctx.$httpBackend.expect('POST', '/api/requests/', {
        name: callVM.call.name,
        method: callVM.call.method,
        url: callVM.call.url,
        type: callVM.call.type,
        headers: null,
        data: null
      }).respond(200, callId);
    })
    .then('I should navigate to the call form with id "(.*)"', (callId: string) => {
      expect(ctx.$scope.vm.$location.path).to.have.been
        .calledWith('/calls/' + callId);
    });
}