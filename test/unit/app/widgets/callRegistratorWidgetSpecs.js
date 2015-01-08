// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function callRegistratorWidgetSpecs() {
    'use strict';

    describe('callRegistrator Widget specs', function callRegistratorWidgetSpecs() {
        var $httpBackend;
        var parentScope;
        var testGlobals;
        var events;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(testSetup) {
            testGlobals = testSetup.setupDirectiveTest();
            $httpBackend = testGlobals.$httpBackend;
            parentScope = testGlobals.parentScope;
            events = testGlobals.events;
        }));

        it('should load the widget with a provided model', function providedModel() {
            // given
            parentScope.request = {};
            var directive = angular.element('<call-registrator rest-call="request">');

            // when
            var $scope = testGlobals.initializeDirective(parentScope, directive);

            // then
            expect($scope.request).toEqual(parentScope.request);
            return $scope;
        });
    });
}());
