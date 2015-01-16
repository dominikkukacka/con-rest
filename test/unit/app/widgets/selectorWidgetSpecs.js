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
      parentScope.options = [{
        value: 1
      }, {
        value: 2
      }, {
        value: 3
      }];
      parentScope.value = parentScope.options[0];
      var directive = angular.element('<selector label="bananas" value="value" display-value="value.value"' +
        'options="options"></selector>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.label).toEqual('bananas');
      expect($scope.value).toEqual(jasmine.objectContaining({
        value: 1
      }));
      expect($scope.displayValue).toEqual(1);
      expect($scope.options.length).toEqual(3);
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

    it('should update the displayed value accordingly', function updateDisplayValue() {
      // given
      providedOptions();
      var $scope = testGlobals.getScope();

      // when
      $scope.select($scope.options[2]);
      $scope.$apply();

      // then
      expect($scope.displayValue).toEqual(3);
      expect(parentScope.value.value).toEqual(3);
    });
  });
}(window.angular));
