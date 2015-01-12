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
                source: 'foo',
                destionation: 'bar'
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
            expect($scope.maps).toEqual([]);
        });
    });
}());
