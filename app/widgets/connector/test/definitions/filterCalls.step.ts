module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import Call = Models.Call;
  import Connector = Models.Connector;
  import Mapper = Models.Mapper;
  var expect = chai.expect;

  library
    .when('I search for destinations', () => {
    })
    .when('I search for sources', () => {

    })
    .then('I see destinations from call $NUM onwards', (callIndex: string) => {
      var destinations = ctx.$scope.vm.getDestinations();
      var index = parseInt(callIndex, 10) - 1;
      expect(destinations.length + index)
        .to.equal(ctx.$scope.vm.calls.length)
      expect(destinations[0]).to.equal(ctx.$scope.vm.calls[index])
    })
    .then('I see sources till call $NUM', (callIndex: string) => {
      expect(ctx.$scope.vm.getSources().length)
        .to.equal(parseInt(callIndex, 10));
    });
}
