module ExecutionDirectives {
  export function executionItem(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        workflowId: '@',
        workflowExecutionId: '@',
        executionId: '@',
        execution: '='
      },
      controller: 'ExecutionVM',
      templateUrl: 'executionItem'
    };
  }
}
