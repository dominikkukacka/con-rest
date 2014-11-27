// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function conRestTestAppScope(angular) {
    'use strict';

    var app = angular.module('con-rest-test', ['con-rest']);

    app.factory('testSetup', function testSetupScope($rootScope, $httpBackend, $compile) {
        function setupDirectiveTest() {
            return {
                $rootScope: $rootScope,
                $httpBackend: $httpBackend,
                parentScope: $rootScope.$new(),
                initializeDirective: initializeDirective
            };
        }

        function initializeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope to run tests on
            return directive.children().scope();
        }

        return {
            setupDirectiveTest: setupDirectiveTest
        };
    });
}(window.angular));