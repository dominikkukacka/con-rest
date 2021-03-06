(function mapperRegistratorWidgetSpecsScope(angular) {
  'use strict';

  describe('<mapper-registrator> specs', function mapperRegistratorSpecs() {
    var testGlobals, parentScope, $httpBackend;

    beforeEach(module('con-rest-test'));

    beforeEach(inject(function setupTest(testSetup) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      $httpBackend = testGlobals.$httpBackend;
    }));

    it('should add a default map to the maps', defaultMap);

    function defaultMap() {
      // given
      var directive = angular.element('<mapper-registrator></mapper-registrator>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.maps[0]).toEqual(jasmine.objectContaining({
        source: null,
        destination: null
      }));
      return $scope;
    }

    it('should automatically add a new map', autoAdd);

    function autoAdd() {
      // given
      var $scope = defaultMap();

      // when
      $scope.maps[0].place = 'data';
      $scope.maps[0].source = 'foo';
      $scope.maps[0].destination = 'bar';
      expect($scope.maps.length).toEqual(1);
      $scope.$digest();

      // then
      expect($scope.maps[1]).toEqual(jasmine.objectContaining({
        source: null,
        destination: null
      }));
      expect($scope.maps.length).toEqual(2);
      return $scope;
    }

    it('should only submit the filled in maps', function filledInMaps() {
      // given
      var $scope = autoAdd();
      $scope.name = 'test';

      // predict
      $httpBackend.expect('POST', '/api/mappers/', {
          name: 'test',
          maps: [{
            place: 'data',
            source: 'foo',
            destination: 'bar'
          }]
        })
        .respond(200, 'ok');

      // when
      $scope.save();
      $httpBackend.flush();

      // then
      expect($scope.maps.length).toEqual(1);
    });
  });
}(window.angular));
