// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowRegistratorWidgetSpecs() {
    'use strict';

    describe('workflow registrator widget specs', function workflowRegistratorWidgetSpecs() {
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

        it('should load the calls in the workflow when an workflow model has been provided', function loadRestCalls() {
            // given
            parentScope.workflow = {
                _id: '5462113c71730c681334887a',
                name: 'First Flow',
                __v: 0,
                calls: [
                    '5461be18868fa2380ebb43b5',
                    '5461be2b868fa2380ebb43b6'
                ],
                $$hashKey: 'object:15'
            };
            var directive = angular.element('<workflow-registrator workflow="workflow"></workflow-registrator>');

            // Child widget is calling for all requests
            $httpBackend.when('GET', '/api/requests/').
                respond(200, []);

            // when
            var scope = initalizeDirective(parentScope, directive);

            // then
            expect(scope.workflow.calls[0]).toEqual(parentScope.workflow.calls[0]);
            expect(scope.workflow.calls[1]).toEqual(parentScope.workflow.calls[1]);
            expect(scope.workflow).toEqual(parentScope.workflow);
        });

        function initalizeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope so we can run some tests on it
            return directive.children().scope();
        }
    });
}());
