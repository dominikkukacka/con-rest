(function connectorWidgetSpecsScope(angular) {
  'use strict';

  describe('<connector> specs', function connectorWidgetSpecs() {
    var testGlobals, parentScope, $httpBackend, Connector;

    beforeEach(module('con-rest-test'));

    beforeEach(inject(function setupTest(testSetup, _Connector_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      $httpBackend = testGlobals.$httpBackend;
      Connector = _Connector_;
    }));

    it('should use provided connector', function connectorToModel() {
      // given
      parentScope.id = 'connectorId';
      parentScope.workflowId = 'workflowId';
      var directive = angular.element('<connector id="id" workflow-id="workflowId"></connector>');

      // predict
      $httpBackend.expect('GET', '/api/workflows/' + parentScope.workflowId +
          '/connectors/' + parentScope.id)
        .respond(200, testGlobals.createDefaultConnectorResponse());

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.connector.source).toBeDefined();
    });
  });
}(window.angular));
