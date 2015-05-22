module WorkflowDirectives {
  export function workflow(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@'
      },
      controller: 'WorkflowVM',
      templateUrl: 'workflow'
    };
  }
}
