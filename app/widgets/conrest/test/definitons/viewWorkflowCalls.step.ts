module ConRESTTest {
  import library = StepLibrary.library;
  import ctx = StepLibrary.ctx;
  var expect = chai.expect;

  library
    .given('the workflow can be found', () => {
      ctx.$httpBackend.when('GET', /\/api\/workflows\/(.*)/)
        .respond(200, {
          _id: 'someid'
        });
    })
    .given('the calls can be found', () => {
      ctx.$httpBackend.when('GET', /\/api\/requests\/(.*)/)
        .respond(200, {
          _id: 'someid'
        });
    })
    .when('I click on workflow $NUM', (workflow: string) => {
      var workflowElement = ctx.$element.find('workflow-overview md-list-item:nth-child(' + workflow + ') h3');
      workflowElement.click();
      ctx.$scope.$apply();
    })
    .then('I see the widget "(.*)" $NUM times', (widget: string, amount: string) => {
      // it's present twice, one for mobile view and one for desktop view
      expect(ctx.$element.find(widget.toSnakeCase()).length).to.equal(parseInt(amount, 10));
    });
}
