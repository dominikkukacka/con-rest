(function connectorRegistratorWidgetSpecsScope(angular) {
  'use strict';

  describe('<connector-registrator> specs', function connectorWidgetRegistratorSpecs() {
    var testGlobals, parentScope, $httpBackend, Mapper, Connector;

    beforeEach(module('con-rest-test'));

    beforeEach(inject(function setupTest(testSetup, _Mapper_, _Connector_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      $httpBackend = testGlobals.$httpBackend;
      Mapper = _Mapper_;
      Connector = _Connector_;
    }));

    it('should use the provided workflow id', providedWorkflowId);

    function providedWorkflowId() {
      // given
      parentScope.connector = new Connector({
        workflow: '123abc'
      });
      var directive = angular.element('<connector-registrator connector="connector"></connector-registrator>');

      // predict
      $httpBackend.expect('GET', '/api/mappers/')
        .respond(200, testGlobals.createDefaultMappersResponse());

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.connector.getWorkflowId()).toEqual('123abc');
      return $scope;
    }

    it('should load the available mappers', function loadMappers() {
      // when
      var $scope = providedWorkflowId();

      // then
      expect($scope.availableMappers instanceof Array).toEqual(true);
      expect($scope.availableMappers.length).toEqual(2);
      expect($scope.availableMappers[0] instanceof Mapper).toEqual(true);
    })
  });
}(window.angular));
