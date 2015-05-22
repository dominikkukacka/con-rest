/**
 * Created by sschacherl on 22.05.2015.
 */
module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('the server finds the mapper', () => {
      ctx.mapper = {
        _id: 'm1a2p3p4e5r6',
        name: 'mapper one',
        maps: [{
          _id: 'm1a2p3o4n5e6',
          place: 'url',
          source: 'source',
          destination: 'destination'
        }]
      };
      ctx.$httpBackend.expect('GET', '/api/mappers/m1a2p3p4e5r6')
        .respond(200, ctx.mapper);
    })
    .then('the mapper is displayed', () => {
      expect(ctx.$scope.vm.mapper._id).to.equal(ctx.mapper._id);
    })
}