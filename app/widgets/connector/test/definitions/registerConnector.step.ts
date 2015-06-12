module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import Call = Models.Call;
  import Connector = Models.Connector;
  import Mapper = Models.Mapper;
  var expect = chai.expect;

  library
    .given('the workflow has $NUM calls bound', (numberOfCalls: string) => {
      var calls: Array<Call> = [];
      ctx.$parent.calls = calls;
      for (var i = 0; i < parseInt(numberOfCalls, 10); i++) {
        calls.push(new Call({
          _id: 'cid' + i
        }));
      }
    })
    .given('the workflow provided an empty connector model', () => {
      ctx.$parent.connector = new Connector();
    })
    .given('I select call $NUM for the (.*)', (callIndex: string, dest: string) => {
      ctx.$scope.vm.connector[dest] = ctx.$scope.vm.calls[parseInt(callIndex, 10) - 1];
    })
    .given('the connector will be saved with id "(.*)"', (id: string) => {
      var connector = ctx.$scope.vm.connector;
      ctx.$httpBackend.expect('POST', '/api/workflows/w1o2r3k4f5l6o7w8/connectors/', {
        source: connector.source._id,
        destination: connector.destination._id,
        mapper: connector.mapper._id
      }).respond(200, id);
    })
    .given('I select mapper $NUM', (mapperIndex: string) => {
      ctx.$scope.vm.connector.mapper = new Mapper({
        _id: 'm1a2p3p4e5r6'
      });
    })
    .then('the parent connector will be updated with id "(.*)"', (id: string) => {
      expect(ctx.$parent.connector._id).to.equal(id);
    });
}
