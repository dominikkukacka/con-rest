module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('the server finds the call', () => {
      ctx.call = {
        _id: 'c1a2l3l3i4d5',
        name: 'call name',
        url: 'https://conrest.com',
        method: 'POST',
        type: 'formData',
        data: {
          ban: 'hammer'
        },
        headers: {
          authorization: 'super cool token'
        }
      };
      ctx.$httpBackend.expect('GET', '/api/requests/c1a2l3l3i4d5')
        .respond(200, ctx.call);
    })
    .then('the call is displayed', () => {
      expect(ctx.$scope.vm.call._id).to.equal(ctx.call._id);
      expect(ctx.$scope.vm.call.name).to.equal(ctx.call.name);
      expect(ctx.$scope.vm.call.url).to.equal(ctx.call.url);
      expect(ctx.$scope.vm.call.method).to.equal(ctx.call.method);
      expect(ctx.$scope.vm.call.type).to.equal(ctx.call.type);
      expect(ctx.$scope.vm.call.data).to.deep.equal(ctx.call.data);
      expect(ctx.$scope.vm.call.headers).to.deep.equal(ctx.call.headers);
    });
}
