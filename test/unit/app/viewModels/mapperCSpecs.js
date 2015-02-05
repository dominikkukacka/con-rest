// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function mapperCSpecsScope() {
  'use strict';

  describe('mapper Controller specs', function mapperCSpecs() {
    var $scope, $httpBackend, events, testGlobals;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup) {
      testGlobals = testSetup.setupControllerTest('mapperC');
      $scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
    }));

    it('should create a new mapper', function createMapper() {
      // given
      $scope.name = 'newMap';
      $scope.maps = [{
        place: 'banana',
        source: 'foo',
        destination: 'bar'
      }];

      // predict
      $httpBackend.expect('POST', '/api/mappers/', {
        name: $scope.name,
        maps: $scope.maps
      }).respond(200, 'ok');

      // when
      $scope.save();
      $httpBackend.flush();

      // then
      expect($scope.name).toEqual(null);
      expect($scope.maps).toEqual([{
        place: null,
        source: null,
        destination: null
      }]);
    });

    it('should add a new map', function addMap() {
      // given
      $scope.maps = [];

      // when
      $scope.addMap();

      // then
      expect($scope.maps[0]).toEqual(jasmine.objectContaining({
        source: null,
        destination: null
      }));
    });

    it('should remove a map', function removeMap() {
      // given
      $scope.maps = [{
        source: '1',
        destination: '1'
      }, {
        source: '2',
        destination: '2'
      }, {
        source: '3',
        destination: '3'
      }];

      // when
      $scope.removeMap(1);

      // then
      expect($scope.maps.length).toEqual(2);
      expect($scope.maps[1]).toEqual(jasmine.objectContaining({
        source: '3',
        destination: '3'
      }));
    });

    it('should prevent removing the last map', function removeLastMap() {
      // given
      $scope.maps = [{
        source: '1',
        destination: '1'
      }];

      // when
      $scope.removeMap(0);

      // then
      expect($scope.maps.length).toEqual(1);
      expect($scope.maps[0]).toEqual(jasmine.objectContaining({
        source: '1',
        destination: '1'
      }));
    });
  });
}());
