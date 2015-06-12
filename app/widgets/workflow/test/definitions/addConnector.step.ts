module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  import Connector = Models.Connector;
  var expect = chai.expect;

  library
    .then('the connector form is displayed', () => {
      expect(ctx.session.connector instanceof Connector).to.equal(true);
      expect(ctx.session.calls).to.equal(ctx.$scope.vm.workflow.calls);
    });
}
