// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflowScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('workflowRegistrator', function workflowDirective() {
        return {
            controller: 'workFlowVM',
            restrict: 'E',
            scope: {
                workflow: '=workflow'
            },
            templateUrl: 'workflowRegistrator',
            link: function workflowRegistratorConstructor(scope) {
                scope.name = scope.workflow.name;

                // create call register object
                if (scope.workflow.calls.length > 0) {
                    for (var i = 0; i < scope.workflow.calls.length; i++) {
                        scope.calls[i] = {
                            id: scope.workflow.calls[i]
                        };
                    }
                }
            }
        };
    });
}(window.angular));
