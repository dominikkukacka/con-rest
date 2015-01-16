(function connectorCSpecsScope() {
  'use strict';

  describe('connectorC specs', function connectorCSpecs() {
    var $scope, $httpBackend, events, testGlobals, defaultMap, Mapper;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup, _Mapper_) {
      testGlobals = testSetup.setupControllerTest('connectorC');
      $scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      Mapper = _Mapper_;
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
      $scope.workflowId = 'workflow1';
      $scope.map = defaultMap;
      spyOn($scope, '$emit');

      // predict
      $httpBackend.expect('POST', '/api/workflows/' + $scope.workflowId + '/connectors/', {
          map: $scope.map.getId()
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
      expect($scope.availableMaps).toEqual(null);

      // predict
      $httpBackend.expect('GET', '/api/mappers/')
        .respond(200, [{
          _id: 'map1',
          maps: []
        }, {
          _id: 'map2',
          maps: []
        }]);

      // when
      $scope.getMappers();
      $httpBackend.flush();

      // then
      expect($scope.availableMaps instanceof Array).toEqual(true);
      expect($scope.availableMaps.length).toEqual(2);
      expect($scope.availableMaps[0] instanceof Mapper).toEqual(true);
    });
  })
}());
