/**
 * Created by Stefan Schacherl on 03.12.2014.
 */
(function restCallOverviewVMSpecs() {
  'use strict';

  describe('restCallOverviewVM specs', function restCallOverviewVMSpecs() {
    var scope, $httpBackend, events, testGlobals;
    beforeEach(module('con-rest-test'));

    beforeEach(inject(function(testSetup, _events_) {
      testGlobals = testSetup.setupControllerTest('restCallOverviewVM');
      scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = _events_;
    }));

    it('should load all rest calls', function loadExistingRestCalls() {
      // given
      var response = null;
      var restCalls = testGlobals.createDefaultRequests();
      $httpBackend.expect('GET', '/api/requests/').
      respond(200, restCalls);

      // when
      scope.$on(events.REQUESTS_RETRIEVED, function restCallCreated(event, res) {
        response = res;
      });
      scope.getRestCalls();

      // then
      $httpBackend.flush();
      testGlobals.expectRequest(scope.restCalls[0]).toEqual(restCalls[0]);
    });
  });
}());
