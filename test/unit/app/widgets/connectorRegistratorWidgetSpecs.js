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
      parentScope.id = '123abc';
      var directive = angular.element('<connector-registrator workflow-id="id"></connector-registrator>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.workflowId).toEqual('123abc');
    });
  });
}(window.angular));
