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
      $scope.isOpen = false;

      // when
      $scope.openOptions();

      // then
      expect($scope.isOpen).toEqual(true);
    });

    it('should select a value', function selectValue() {
      // given
      $scope.value = null;

      // when
      $scope.select(1);

      // then
      expect($scope.value).toEqual(1);
    });
  })
}());
