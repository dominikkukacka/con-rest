module WorkflowExecutionDirectives {
  export function workflowExecution(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        workflowId: '@',
        workflowExecutionId: '@',
        workflowExecution: '='
      },
      controller: 'WorkflowExecutionVM',
      templateUrl: 'workflowExecution'
    };
  }
}
