// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function conRestTestAppScope(angular) {
    'use strict';

    var app = angular.module('con-rest-test', ['con-rest']);

    app.factory('testSetup', function testSetupScope($rootScope, $httpBackend, $compile, $controller, events) {

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
                data: {
                    ba: 'nana'
                },
                headers: {
                    to: 'ken'
                }
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
            var secondRequest = createDefaultRequest();
            secondRequest._id = 'someid2';
            var thirdRequest = createDefaultRequest();
            thirdRequest._id = 'someid3';
            return [createDefaultRequest(),
                secondRequest,
                thirdRequest
            ];
        }

        function createDefaultWorkflow() {
            return {
                _id: 'flowid',
                name: 'flow',
                calls: createDefaultRequests()
            };
        }

        function createDefaultRequestWorkflow() {
            var workflow = createDefaultWorkflow();
            var calls = [];
            for (var i = 0; i < workflow.calls.length; i++) {
                calls.push(workflow.calls[i]._id);
            }
            workflow.calls = calls;
            return workflow;
        }

        function createResponseWorkflow() {
            var workflow = createDefaultWorkflow();
            workflow.calls = ['callid1', 'callid2'];
            return workflow;
        }

        function createDefaultResponse() {
            return {
                reference: 'someReference',
                more: 'xyz'
            };
        }

        function createDefaultWorkflows() {
            return [createResponseWorkflow()];
        }

        function givenRequest(request) {
            return {
                isDefault: function isDefault() {
                    request.name = 'fakeCall';
                    request.url = 'http://fake.url';
                    request.method = 'GET';
                    request.data = {
                        ba: 'nana'
                    };
                    request.headers = {
                        foo: 'bar'
                    };
                }
            };
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
                toEqual: function toEqual(expectedWorkflow) {
                    expect(workflow.name).toEqual(expectedWorkflow.name);
                    for (var i = 0; i < workflow.calls.length; i++) {
                        var call = workflow.calls[i];
                        var expectedCall = expectedWorkflow.calls[i];
                        expectRequest(call).toEqual(expectedCall);
                    }
                },
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
                toEqual: function toEqual(expectedWorkflows) {
                    expect(workflows.length).toEqual(expectedWorkflows.length);
                    for (var i = 0; i < workflows.length; i++) {
                        var workflow = workflows[i];
                        var expectedWorkflow = expectedWorkflows[i];
                        expectWorkflow(workflow).toEqual(expectedWorkflow);
                    }
                },
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

        function expectResponse(response) {
            return {
                toEqual: function toEqual(expectedResponse) {
                    expect(response).toEqual(expectedResponse);
                }
            };
        }

        function createDefaultTestGlobals() {
            return {
                createDefaultRequest: createDefaultRequest,
                createDefaultRequests: createDefaultRequests,
                createDefaultWorkflow: createDefaultWorkflow,
                createDefaultWorkflows: createDefaultWorkflows,
                createDefaultRequestWorkflow: createDefaultRequestWorkflow,
                createDefaultResponse: createDefaultResponse,
                createEmptyRequest: createEmptyRequest,
                events: events,
                expectRequest: expectRequest,
                expectWorkflow: expectWorkflow,
                expectWorkflows: expectWorkflows,
                expectResponse: expectResponse,
                givenRequest: givenRequest,
                $httpBackend: $httpBackend
            };
        }

        function setupDirectiveTest() {
            var testGlobals = createDefaultTestGlobals();

            testGlobals.parentScope = $rootScope.$new();
            testGlobals.initializeDirective = initializeDirective;

            return testGlobals;
        }

        function setupControllerTest(controllerName) {
            var testGlobals = createDefaultTestGlobals();

            testGlobals.scope = $rootScope.$new();

            $controller(controllerName, {
                $scope: testGlobals.scope
            });
            return testGlobals;
        }

        return {
            setupDirectiveTest: setupDirectiveTest,
            setupControllerTest: setupControllerTest
        };
    });
}(window.angular));
