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
                createDefaultRequests: createDefaultRequests,
                createDefaultWorkflow: createDefaultWorkflow,
                createDefaultWorkflows: createDefaultWorkflows,
                createEmptyRequest: createEmptyRequest,
                expectRequest: expectRequest,
                expectWorkflow: expectWorkflow,
                expectWorkflows: expectWorkflows
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

        function createDefaultRequests() {
            return [createDefaultRequest()];
        }

        function createDefaultWorkflow() {
            return {
                _id: 'flowid',
                name: 'flow',
                calls: createDefaultRequests()
            };
        }

        function createResponseWorkflow() {
            var workflow = createDefaultWorkflow();
            workflow.calls = ['callid1', 'callid2'];
            return workflow;
        }

        function createDefaultWorkflows() {
            return [createResponseWorkflow()];
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

        function expectWorkflow(workflow) {
            return {
                toMatch: function toMatch(expectedWorkflow) {
                    expect(workflow.name).toEqual(expectedWorkflow.name);
                    for (var i = 0; i < workflow.calls.length; i++) {
                        var call = workflow.calls[i];
                        var expectedCall = expectedWorkflow.calls[i];
                        expect(call._id).toEqual(expectedCall);
                    }
                }
            }
        }

        function expectWorkflows(workflows) {
            return {
                toMatch: function toMatch(expectedWorkflows) {
                    expect(workflows.length).toEqual(expectedWorkflows.length);
                    for (var i = 0; i < workflows.length; i++) {
                        var workflow = workflows[i];
                        var expectedWorkflow = expectedWorkflows[i];
                        expectWorkflow(workflow).toMatch(expectedWorkflow);
                    }
                }
            }
        }

        return {
            setupDirectiveTest: setupDirectiveTest
        };
    });
}(window.angular));