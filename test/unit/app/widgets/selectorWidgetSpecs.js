(function selectorWidgetSpecsScope(angular) {
  'use strict';

  describe('<selector> specs', function selectorWidgetSpecs() {
    var testGlobals, parentScope;

    beforeEach(module('con-rest-test'));

    beforeEach(inject(function setupTest(testSetup) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
    }));

    it('should use provided options', function providedOptions() {
      // given

      // when

      // then

    });
  });
}(window.angular));
