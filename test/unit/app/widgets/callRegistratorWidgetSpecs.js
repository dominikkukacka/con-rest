// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function callRegistratorWidgetSpecs() {
    'use strict';

    describe('callRegistrator Widget specs', function callRegistratorWidgetSpecs(){
        var $rootScope;
        var $httpBackend;
        var $compile;
        var events;
        var parentScope;

        beforeEach(module('con-rest'));

        beforeEach(inject(function setupTests(_$rootScope_, _$httpBackend_, _$compile_, _events_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $compile = _$compile_;
            events = _events_;
            parentScope = $rootScope.$new();
        }));

        it('should load the widget with a provided model', function providedModel() {
            // given
            parentScope.request = {};
            var directive = angular.element('<call-registrator rest-call="request">');

            // when
            var scope = initalizeDirective(parentScope, directive);

            // then
            expect(scope.request).toEqual(parentScope.request);
        });

        function initalizeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope so we can run some tests on it
            return directive.children().scope();
        }
    });
}());