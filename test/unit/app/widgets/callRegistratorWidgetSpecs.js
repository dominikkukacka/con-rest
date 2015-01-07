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

        it('should load the widget with a provided model', providedModel);

        function providedModel() {
            // given
            parentScope.request = {};
            var directive = angular.element('<call-registrator rest-call="request">');

            // when
            var $scope = testGlobals.initializeDirective(parentScope, directive);

            // then
            expect($scope.request).toEqual(parentScope.request);
            return $scope;
        }

        it('should register a rest call', function registerRestCall() {
            // given
            var response = null;
            var $scope = providedModel();
            testGlobals.givenRequest($scope.request).isDefault();

            // when
            $scope.$on(events.REGISTRATION_SUCCESSFUL, function registrationSuccessful(event, res) {
                response = res;
            });
            $httpBackend.expect('POST', '/api/requests', {
                name: $scope.request.name,
                url: $scope.request.url,
                method: $scope.request.method,
                data: $scope.request.data,
                headers: $scope.request.headers
            }).respond(200, 'someguidid');
            $scope.save();

            // then
            $httpBackend.flush();
            expect(response).toEqual('someguidid');
            expect($scope.request._id).toEqual('someguidid');
        });

        it('should display an handle errors accordingly', function emitFailed() {
            // given
            var response = null;
            var $scope = providedModel();

            // when
            $scope.$on(events.REGISTRATION_FAILED, function requestFailed(event, res) {
                response = res;
            });
            $httpBackend.when('POST', '/api/requests').respond(400, 'bad request');
            $scope.save();

            // then
            $httpBackend.flush();
            expect(response.status).toEqual(400);
            expect(response.data).toEqual('bad request');
        });
    });
}());
