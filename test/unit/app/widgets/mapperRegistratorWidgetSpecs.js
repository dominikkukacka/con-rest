(function mapperRegistratorWidgetSpecsScope(angular) {
    'use strict';

    describe('<mapper-registrator> specs', function mapperRegistratorSpecs() {
        var testGlobals, parentScope;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTest(testSetup) {
            testGlobals = testSetup.setupDirectiveTest();
            parentScope = testGlobals.parentScope;
        }));

        it('should add a default map to the maps', function defaultMap() {
            // given
            var directive = angular.element('<mapper-registrator></mapper-registrator>');

            // when
            var $scope = testGlobals.initializeDirective(parentScope, directive);

            // then
            expect($scope.maps[0]).toEqual(jasmine.objectContaining({
                source: null,
                destination: null
            }));
        });
    });
}(window.angular));
