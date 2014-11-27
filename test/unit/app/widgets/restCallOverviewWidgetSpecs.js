/**
 * Created by sschacherl on 27.11.2014.
 */
(function restCallOverviewWidgetSpecs() {
    'use strict';

    describe('rest call overview widget specs', function restCallOverviewWidgetSpecs() {
        var $rootScope;
        var $httpBackend;
        var $compile;
        var events;
        var $mdDialog;
        var parentScope;
        var oneRestCall = [
            {
                _id: 'someid',
                name: 'restcall1',
                url: 'http://some.test.url/api/test',
                type: 'formData',
                data: {param1: "somedata1"},
                headers: {hparam1: "someheader1", hparam2: "someheader2"}
            }
        ];

        beforeEach(module('con-rest'));

        beforeEach(inject(function setupTests(_$rootScope_, _$httpBackend_, _$compile_, _events_, _$mdDialog_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $compile = _$compile_;
            events = _events_;
            $mdDialog = _$mdDialog_;
            parentScope = $rootScope.$new();
        }));

        it('should load an overview of all registered rest calls', loadRestCallOverview);
        it('should delete a rest call', function requestRestCallDeletion() {
            // given
            var scope = loadRestCallOverview();
            var fakeEvent = {};
            var fakeRestCall = {
                _id: 'fakeId',
                name: 'fakerestcall',
                url: 'http://some.fake.url/api/test',
                type: 'payload',
                data: {fakeparam1: 'fakedata1'},
                headers: {hparam1: "fakeheader1", hparam2: "fakeheader2"}
            };

            spyOn($mdDialog, 'show').andCallThrough();
            spyOn(scope, 'removeRestCallOnConfirm');

            // when
            scope.confirmRestCallDeletion(fakeEvent, fakeRestCall);

            // then
            expect($mdDialog.show).toHaveBeenCalled();
            expect(scope.removeRestCallOnConfirm).toHaveBeenCalledWith(fakeRestCall);
        });

        function loadRestCallOverview() {
            // given
            var directive = angular.element('<rest-call-overview></rest-call-overview>');

            $httpBackend.expect('GET', '/api/requests/').
                respond(200, oneRestCall);

            // when
            var scope = initializeDirective(parentScope, directive);
            $httpBackend.flush();

            // then
            expect(scope.restCalls[0].name).toEqual(oneRestCall[0].name);
            expect(scope.restCalls[0].url).toEqual(oneRestCall[0].url);
            expect(scope.restCalls[0].type).toEqual(oneRestCall[0].type);
            expect(scope.restCalls[0].data).toEqual(oneRestCall[0].data);
            expect(scope.restCalls[0].headers).toEqual(oneRestCall[0].headers);

            return scope;
        }

        function initializeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope so we can run some tests on it
            return directive.children().scope();
        }
    });
}());