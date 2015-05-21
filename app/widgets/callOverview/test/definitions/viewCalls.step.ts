module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('$NUM calls have been registered', (numberOfCalls: string) => {
      var amountOfCalls = parseInt(numberOfCalls, 10);
      for (var i = 0; i < amountOfCalls; i++) {
        ctx.calls.push({
          _id: 'cid' + i,
          name: 'Call' + (i + 1)
        });
      }
    })
    .given('I search for all calls', () => {
      ctx.$httpBackend.expect('GET', '/api/requests/')
        .respond(200, ctx.calls);
    })
    .then('call $NUM has "(.*)" as name', (call: string, name: string) => {
      var callIndex = parseInt(call, 10);
      expect(ctx.$scope.vm.calls[callIndex - 1].name).to.equal(name);
    });
}
