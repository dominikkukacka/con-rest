// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function workflow(angular){
    'use strict';

    var app = angular.module('con-rest');

    app.directive('workflow', function workflowDirective(){
        return {
            controller: 'workFlowVM',
            restrict: 'E',
            scope: {
                workflow: '=workflow'
            },
            templateUrl: 'workflow'
        };
    });
}(window.angular));
