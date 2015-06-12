module ExecutionDirectives {
  export function execution(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        workflowId: '@',
        workflowExecutionId: '@',
        executionId: '@',
        execution: '='
      },
      controller: 'ExecutionVM',
      templateUrl: 'execution'
    };
  }
}
