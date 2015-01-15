(function connectorCSpecsScope() {
  'use strict';

  describe('connectorC specs', function connectorCSpecs() {
    var $scope, $httpBackend, events, testGlobals;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup) {
      testGlobals = testSetup.setupControllerTest('connectorC');
      $scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
    }));

    it('should create a new connector', function createNewConnector() {
      // given

      // when

      // then

    });
  })
}());
