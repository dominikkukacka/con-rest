module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('the server finds the connector', () => {
      ctx.connector = {
        _id: 'c1o2n3n4e5c6t7o8r9',
        source: {
          _id: 'c1i2d3o4n5e6',
          name: 'call one'
        },
        destination: {
          _id: 'c1i2d3t4w5o6',
          name: 'call two'
        },
        mapper: {
          _id: 'm1a2p3i4d5',
          name: 'mapper',
          maps: [{
            _id: 'm1i2d3o4n5e6',
            place: 'url',
            source: 'foo.bar',
            destination: 'foobar'
          }]
        }
      };
      ctx.$httpBackend.expect('GET',
        '/api/workflows/w1o2r3k4f5l6o7w8/connectors/c1o2n3n4e5c6t7o8r9')
        .respond(200, ctx.connector);
      ctx.$httpBackend.when('GET', /\/api\/requests\/(.*)/)
        .respond(200, {
          _id: 'someid'
        });
      ctx.$httpBackend.when('GET', /\/api\/mappers\/(.*)/)
        .respond(200, {
          _id: 'someid'
        });
    })
    .then('the connector is displayed', () => {
      expect(ctx.$scope.vm.connector._id).to.equal(ctx.connector._id);
    })
    .then('the source is displayed', () => {
      expect(ctx.$scope.vm.connector.source._id).to.equal(ctx.connector.source._id);
      expect(ctx.$scope.vm.connector.source.name).to.equal(ctx.connector.source.name);
    })
    .then('the destination is displayed', () => {
      expect(ctx.$scope.vm.connector.destination._id).to.equal(ctx.connector.destination._id);
      expect(ctx.$scope.vm.connector.destination.name).to.equal(ctx.connector.destination.name);
    })
    .then('the maps are displayed', () => {
      expect(ctx.$scope.vm.connector.mapper._id).to.equal(ctx.connector.mapper._id);
      expect(ctx.$scope.vm.connector.mapper.name).to.equal(ctx.connector.mapper.name);
      expect(ctx.$scope.vm.connector.mapper.maps[0]._id).to.equal(ctx.connector.mapper.maps[0]._id);
      expect(ctx.$scope.vm.connector.mapper.maps[0].place).to.equal(ctx.connector.mapper.maps[0].place);
    });
}
