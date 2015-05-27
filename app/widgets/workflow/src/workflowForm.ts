module WorkflowDirectives {
  export function workflowForm(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'WorkflowVM',
      templateUrl: 'workflowForm'
    };
  }
}
