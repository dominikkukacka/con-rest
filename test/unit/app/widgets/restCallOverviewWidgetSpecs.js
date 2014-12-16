/**
 * Created by sschacherl on 27.11.2014.
 */
(function restCallOverviewWidgetSpecs() {
    'use strict';

    describe('rest call overview widget specs', function restCallOverviewWidgetSpecs() {
        var $httpBackend;
        var $mdDialog;
        var parentScope;
        var testGlobals;

        beforeEach(module('con-rest-test'));

        beforeEach(inject(function setupTests(_$mdDialog_, testSetup) {
            $mdDialog = _$mdDialog_;
            testGlobals = testSetup.setupDirectiveTest();
            $httpBackend = testGlobals.$httpBackend;
            parentScope = testGlobals.parentScope;
        }));

        it('should load an overview of all registered rest calls', loadRestCallOverview);
        it('should delete a rest call', function requestRestCallDeletion() {
            // given
            var scope = loadRestCallOverview();
            var expectedEvent = {};
            var expectedRequest = testGlobals.createDefaultRequest();

            spyOn($mdDialog, 'show').andCallThrough();
            spyOn(scope, 'removeRestCallOnConfirm');

            // when
            scope.confirmRestCallDeletion(expectedEvent, expectedRequest);

            // then
            expect($mdDialog.show).toHaveBeenCalled();
            expect(scope.removeRestCallOnConfirm).toHaveBeenCalledWith(expectedRequest);
        });

        function loadRestCallOverview() {
            // given
            var directive = angular.element('<rest-call-overview></rest-call-overview>');
            var expectedWorkflow = testGlobals.createDefaultRequests();

            $httpBackend.expect('GET', '/api/requests/').
                respond(200, expectedWorkflow);

            // when
            var scope = testGlobals.initializeDirective(parentScope, directive);
            $httpBackend.flush();

            // then
            testGlobals.expectRequest(scope.restCalls[0]).toEqual(expectedWorkflow[0]);

            return scope;
        }
    });
}());