module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .when('I click on workflow $NUM', (workflow: string) => {
      var workflowElement = ctx.$element.find('workflow-overview md-list-item:nth-child(' + workflow + ') h3');
      workflowElement.click();
      ctx.$scope.$apply();
    })
    .then('I see the widget "(.*)"', (widget: string) => {
      expect(ctx.$element.find(widget.toSnakeCase()).length).to.equal(1);
    });
}
