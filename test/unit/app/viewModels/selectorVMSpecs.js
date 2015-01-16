(function selectorVMSpecsScope() {
  'use strict';

  describe('selectorVM specs', function selectorVMSpecs() {
    var $scope, $httpBackend, events, testGlobals;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup) {
      testGlobals = testSetup.setupControllerTest('selectorVM');
      $scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
    }));

    it('should open options', function openOptions() {
      // given

      // when

      // then

    });
  })
}());
