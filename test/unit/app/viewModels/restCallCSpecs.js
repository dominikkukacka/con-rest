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

    describe('saving', function saving() {
      it('should register a rest call', function registerRestCall() {
        // given
        testGlobals.givenRequest($scope.request).isDefault();
        spyOn($scope, '$emit');
        $httpBackend.expect('GET', '/api/files/').respond(200, {});

        // when
        $httpBackend.expect('POST', '/api/requests', {
          name: $scope.request.name,
          url: $scope.request.url,
          method: $scope.request.method,
          data: $scope.request.data,
          headers: $scope.request.headers,
          files: $scope.request.files
        }).respond(200, 'someguidid');
        $scope.save();

        // then
        $httpBackend.flush();
        expect($scope.$emit).toHaveBeenCalledWith(events.REGISTRATION_SUCCESSFUL,
          'someguidid');
        expect($scope.request._id).toEqual('someguidid');
      });

      it('should update an existing rest call', function updateRestCall() {
        // given
        testGlobals.givenRequest($scope.request).isDefault();
        $scope.request._id = 'someguidid';
        spyOn($scope, '$emit');
        $httpBackend.expect('GET', '/api/files/').respond(200, {});

        // when
        $httpBackend.expect('PUT', '/api/requests/' + $scope.request._id, {
          _id: $scope.request._id,
          name: $scope.request.name,
          url: $scope.request.url,
          method: $scope.request.method,
          data: $scope.request.data,
          headers: $scope.request.headers,
          files: $scope.request.files
        }).respond(200, 'someguidid');
        $scope.save();

        // then
        $httpBackend.flush();
        expect($scope.$emit).toHaveBeenCalledWith(events.REQUEST_UPDATED,
          'someguidid');
        expect($scope.request._id).toEqual('someguidid');
      });

      it('should display an handle errors accordingly', function emitFailed() {
        // given
        spyOn($scope, '$emit');
        $httpBackend.expect('GET', '/api/files/').respond(200, {});

        // when
        $httpBackend.when('POST', '/api/requests').respond(400, 'bad request');
        $scope.save();

        // then
        $httpBackend.flush();
        expect($scope.$emit).toHaveBeenCalledWith(events.REGISTRATION_FAILED,
          jasmine.objectContaining({
            status: 400,
            data: 'bad request'
          }));
      });
    });

    it('should request cancel editing', function requestCancelEditing() {
      // given
      spyOn($scope, '$emit');

      // when
      $scope.requestCancelEditing();

      // then
      expect($scope.$emit).toHaveBeenCalledWith(events.CANCEL_EDITING);
    });

    it('should select a method', function selectMethod() {
      // given
      $scope.openMethods = true;
      expect($scope.request.method).toEqual(null);

      // when
      $scope.selectMethod('GET');

      // then
      expect($scope.request.method).toEqual('GET');
      expect($scope.openMethods).toEqual(false);
    });

    it('should select a type of formdata or payload', function selectType() {
      // given
      $scope.openTypes = true;
      expect($scope.request.type).toEqual(null);

      // when
      $scope.selectType('formdata');

      // then
      expect($scope.request.type).toEqual('formdata');
      expect($scope.openTypes).toEqual(false);
    });

    it('should toggle open methods', function toggleMethodsOpen() {
      // given
      $scope.openMethods = false;

      // when
      $scope.toggleMethodsDropdown();

      // then
      expect($scope.openMethods).toEqual(true);
    });

    it('should toggle open types', function toggleTypesOpen() {
      // given
      $scope.openTypes = false;

      // when
      $scope.toggleTypesDropdown();

      // then
      expect($scope.openTypes).toEqual(true);
    });
  });
}());
