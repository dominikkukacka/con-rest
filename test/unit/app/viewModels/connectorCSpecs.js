(function connectorCSpecsScope() {
  'use strict';

  describe('connectorC specs', function connectorCSpecs() {
    var $scope, $httpBackend, events, testGlobals, defaultMap;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup, Map) {
      testGlobals = testSetup.setupControllerTest('connectorC');
      $scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      defaultMap = new Map({
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

      // when

      // then

    });
  })
}());
