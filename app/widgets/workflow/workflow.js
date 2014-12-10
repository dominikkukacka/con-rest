// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflow(angular, undefined) {
    'use strict';

    var app = angular.module('con-rest');

    app.directive('workflow', function workflowDirective(events) {
        return {
            controller: 'workFlowVM',
            restrict: 'E',
            scope: {
                workflow: '=workflow'
            },
            templateUrl: 'workflow',
            link: function workflowConstructor(scope) {
                // The workflow is new.
                if (scope.workflow._id === undefined) {
                    scope.editing = true;
                }

                scope.$on(events.WORKFLOW_CREATED, scope.endEditing);
                scope.$on(events.WORKFLOW_UPDATED, scope.endEditing);
            }
        };
    });
}(window.angular));
