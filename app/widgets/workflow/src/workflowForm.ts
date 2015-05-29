module WorkflowDirectives {
  export function workflowForm(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@'
      },
      controller: 'WorkflowVM',
      templateUrl: 'workflowForm'
    };
  }
}
