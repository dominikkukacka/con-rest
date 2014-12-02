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
                initializeDirective: initializeDirective,
                createDefaultRequest: createDefaultRequest,
                createDefaultWorkflow: createDefaultWorkflow,
                createEmptyRequest: createEmptyRequest,
                expectRequest: expectRequest
            };
        }

        function initializeDirective(scope, directive) {
            $compile(directive)(scope);
            $rootScope.$digest();
            // Expose the scope to run tests on
            return directive.children().scope();
        }

        function createDefaultRequest() {
            return {
                _id: 'someid',
                name: 'fakeCall',
                url: 'https://fake.url',
                method: 'PUT',
                data: { ba: 'nana' },
                headers: { to: 'ken' }
            };
        }

        function createEmptyRequest() {
            return {
                _id: null,
                name: null,
                url: null,
                method: null,
                data: null,
                headers: null
            };
        }

        function createDefaultWorkflow() {
            return [createDefaultRequest()];
        }

        function expectRequest(request) {
            return {
                toEqual: function toEqual(expectedRequest) {
                    expect(request.name).toEqual(expectedRequest.name);
                    expect(request.url).toEqual(expectedRequest.url);
                    expect(request.method).toEqual(expectedRequest.method);
                    expect(request.data).toEqual(expectedRequest.data);
                    expect(request.headers).toEqual(expectedRequest.headers);
                }
            };
        }

        return {
            setupDirectiveTest: setupDirectiveTest
        };
    });
}(window.angular));