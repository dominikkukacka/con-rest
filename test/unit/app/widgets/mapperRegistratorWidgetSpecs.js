(function mapperRegistratorWidgetSpecsScope(angular) {
    'use strict';

    describe('<mapper-registrator> specs', function mapperRegistratorSpecs() {
        var testGlobals, parentScope;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTest(testSetup) {
            testGlobals = testSetup.setupDirectiveTest();
            parentScope = testGlobals.parentScope;
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

        it('should automatically add a new map', function autoAdd() {
            // given
            var $scope = defaultMap();

            // when
            $scope.maps[0].source = 'something';
            $scope.maps[0].destination = 'something';
            expect($scope.maps.length).toEqual(1);
            $scope.$digest();

            // then
            expect($scope.maps[1]).toEqual(jasmine.objectContaining({
                source: null,
                destination: null
            }));
        });
    });
}(window.angular));
