(function selectorWidgetSpecsScope(angular) {
  'use strict';

  describe('<selector> specs', function selectorWidgetSpecs() {
    var testGlobals, parentScope, $timeout;

    beforeEach(module('con-rest-test'));

    beforeEach(inject(function setupTest(testSetup, _$timeout_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      $timeout = _$timeout_;
    }));

    it('should use provided options', providedOptions);

    function providedOptions() {
      // given
      parentScope.options = [1, 2, 3];
      parentScope.value = 1;
      var directive = angular.element('<selector label="bananas" value="value" options="options"></selector>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.label).toEqual('bananas');
      expect($scope.value).toEqual(1);
      expect($scope.options).toEqual([1, 2, 3]);
    }

    it('should close the list when the input element is blurred', function closeOnBlur() {
      // given
      providedOptions();
      var $scope = testGlobals.getScope();
      var directive = testGlobals.getDirective();
      $scope.isOpen = true;

      // when
      directive.find('input').triggerHandler('blur');
      $timeout.flush();

      // then
      expect($scope.isOpen).toEqual(false);
    });
  });
}(window.angular));
