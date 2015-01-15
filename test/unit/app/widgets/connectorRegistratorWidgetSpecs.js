(function connectorRegistratorWidgetSpecsScope(angular) {
  'use strict';

  describe('<connector-registrator> specs', function connectorWidgetRegistratorSpecs() {
    var testGlobals, parentScope;

    beforeEach(module('con-rest-test'));

    beforeEach(inject(function setupTest(testSetup) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
    }));

    it('should use the provided workflow id', function providedWorkflowId() {
      // given

      // when

      // then

    });
  });
}(window.angular));
