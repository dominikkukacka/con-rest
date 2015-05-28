module ExecutionDirectives {
  export function execution(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        execution: '='
      },
      controller: 'ExecutionVM',
      templateUrl: 'execution'
    };
  }
}
