/**
 * Created by sschacherl on 27.11.2014.
 */
(function restCallOverviewWidgetSpecs() {
  'use strict';

  describe('rest call overview widget specs', function restCallOverviewWidgetSpecs() {
    var $httpBackend;
    var parentScope;
    var testGlobals;

    beforeEach(module('con-rest-test'));

    beforeEach(inject(function setupTests(testSetup) {
      testGlobals = testSetup.setupDirectiveTest();
      $httpBackend = testGlobals.$httpBackend;
      parentScope = testGlobals.parentScope;
    }));

    it('should load an overview of all registered rest calls', loadRestCallOverview);

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
