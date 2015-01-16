(function connectorCSpecsScope() {
  'use strict';

  describe('connectorC specs', function connectorCSpecs() {
    var $scope, $httpBackend, events, testGlobals, defaultMap, Mapper, Connector;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup, _Mapper_, _Connector_) {
      testGlobals = testSetup.setupControllerTest('connectorC');
      $scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      Mapper = _Mapper_;
      Connector = _Connector_;
      defaultMap = new Mapper({
        _id: 'mapid1',
        maps: [{
          source: 'ban.na.na',
          destination: 'foo.bar'
        }]
      });
    }));

    it('should create a new connector', function createNewConnector() {
      // given
      $scope.connector = new Connector({
        workflow: 'workflow1',
        mapper: defaultMap,
        source: 'restcall1',
        destination: 'restcall2'
      });
      spyOn($scope, '$emit');

      // predict
      $httpBackend.expect('POST', '/api/workflows/' + $scope.connector.getWorkflowId() + '/connectors/', {
          mapper: $scope.connector.getMapper().getId(),
          source: $scope.connector.getSource(),
          destination: $scope.connector.getDestination()
        })
        .respond(200, 'connectorId');

      // when
      $scope.save();
      $httpBackend.flush();

      // then
      expect($scope.$emit).toHaveBeenCalledWith(events.CONNECTOR_CREATED, 'connectorId');
    });

    it('should retrieve available mappers', function retrieveMappers() {
      // given
      expect($scope.availableMappers).toEqual(null);

      // predict
      $httpBackend.expect('GET', '/api/mappers/')
        .respond(200, testGlobals.createDefaultMappersResponse());

      // when
      $scope.getMappers();
      $httpBackend.flush();

      // then
      expect($scope.availableMappers instanceof Array).toEqual(true);
      expect($scope.availableMappers.length).toEqual(2);
      expect($scope.availableMappers[0] instanceof Mapper).toEqual(true);
    });
  })
}());
