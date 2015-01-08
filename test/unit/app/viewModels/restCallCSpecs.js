// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function restCallCSpecs() {
    'use strict';

    describe('Rest Call View Model specs', function restCallCSpecs() {

        var $scope, $httpBackend, events, testGlobals;
        beforeEach(module('con-rest-test'));

        beforeEach(inject(function(testSetup) {
            testGlobals = testSetup.setupControllerTest('restCallC');
            $scope = testGlobals.scope;
            $httpBackend = testGlobals.$httpBackend;
            events = testGlobals.events;
        }));

        it('should register a rest call', function registerRestCall() {
            // given
            testGlobals.givenRequest($scope.request).isDefault();
            spyOn($scope, '$emit');

            // when
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
            expect($scope.$emit).toHaveBeenCalledWith(events.REGISTRATION_SUCCESSFUL, 'someguidid');
            expect($scope.request._id).toEqual('someguidid');
        });

        it('should display an handle errors accordingly', function emitFailed() {
            // given
            spyOn($scope, '$emit');

            // when
            $httpBackend.when('POST', '/api/requests').respond(400, 'bad request');
            $scope.save();

            // then
            $httpBackend.flush();
            expect($scope.$emit).toHaveBeenCalledWith(events.REGISTRATION_FAILED, jasmine.objectContaining({
                status: 400,
                data: 'bad request'
            }));
        });
    });
}());
