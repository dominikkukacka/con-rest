module ExecutionDirectives {
  export function executionItem(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        workflowId: '@',
        executionId: '@',
        execution: '='
      },
      controller: 'ExecutionVM',
      templateUrl: 'executionItem'
    };
  }
}
