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
    .then('I see the widget "(.*)"', (widget: string) => {
      expect(ctx.$element.find(widget.toSnakeCase()).length).to.equal(1);
    });
}
