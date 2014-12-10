// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowWidgetSpecsScope(angular) {
    'use strict';

    describe('workflow widget specs', function workflowWidgetSpecs() {
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

        it('should end editing mode when the workflow has been created', function created() {
            // given
            parentScope.workflow = {};
            var directive = angular.element('<workflow workflow="workflow"></workflow>')
            var scope = initializeDirective(parentScope, directive);

            // when
            scope.$broadcast(events.WORKFLOW_CREATED);

            // then
            expect(scope.editing).toEqual(false);
        });

        it('should end editing mode when the workflow has been updated', function updated() {
            // given
            parentScope.workflow = {};
            var directive = angular.element('<workflow workflow="workflow"></workflow>')
            var scope = initializeDirective(parentScope, directive);

            // when
            scope.$broadcast(events.WORKFLOW_UPDATED);

            // then
            expect(scope.editing).toEqual(false);
        });

        function initializeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope so we can run some tests on it
            return directive.children().scope();
        }
    });
}(window.angular));